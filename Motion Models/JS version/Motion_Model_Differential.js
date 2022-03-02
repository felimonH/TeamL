
class diff {
    constructor (r_l, r_r, L, u_l, u_r, x, y, theta) {
        this.r_l = r_l;
        this.r_r = r_r;
        this.L = L;
        this.u_l = u_l;
        this.u_r = u_r;
        this.x = x;
        this.y = y;
        this.theta = theta;
    }

    forwardKinematics (R, omega, ICC, x, y, theta, t) {
        let x_new = (Math.cos(omega * t) * (x - ICC[0])) + (-Math.sin(omega * t) * (y - ICC[1])) + ICC[0];
        let y_new = (Math.sin(omega * t) * (x - ICC[0])) + (Math.cos(omega * t) * (y - ICC[1])) + ICC[1];
        let theta_new = theta + (omega * t);
        return [x_new, y_new, theta_new];
    }
    
    straightMotion (v, x, y, theta, t) {
        let x_new = x + (v * t * np.cos(theta));
        let y_new = y + (v * t * np.sin(theta));
        return [x_new, y_new, theta];
    }
    
    robotStep (r_l, r_r, L, u_l, u_r, x, y, theta, t) {
        let v_l = u_l * r_l;
        let v_r = u_r * r_r;
        let result = [];
    
        if (v_l == v_r) {
            result = straightMotion(v_l, x, y, theta, t);
        } else {
            let R = (L/2) * (v_l + v_r)/(v_r - v_l);
            let omega = (v_r - v_l)/L;
            let ICC = [x - R * Math.sin(theta), y + R * Math.cos(theta)];
    
            result = forwardKinematics(R, omega, ICC, x,y, theta, t);
        }
    
        return result;
    }
    
    main (r_l, r_r, L, u_l, u_r, x, y, theta) {
        let robot_path = [];
    
        let t = 0;
        let t_step = 0.1;
    
        robot_path.push([x, y]);
    
        loopy = 0;
    
        while ( loopy < 100 ) {
            t += t_step;
            let result = robotStep(r_l, r_r, L, u_l, u_r, x, y, theta, t_step);
            robot_path.push([result[0], result[1]]);
            loopy += 1;
        }
    
        console.log(robot_path);
    }



}
