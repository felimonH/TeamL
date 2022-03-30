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
        this.time = 0;
        this.t_step = 0.1;
    }

    forwardKinematics (R, omega, ICC, x, y, theta, t) {
        let x_new = (Math.cos(omega * t) * (x - ICC[0])) + (-Math.sin(omega * t) * (y - ICC[1])) + ICC[0];
        let y_new = (Math.sin(omega * t) * (x - ICC[0])) + (Math.cos(omega * t) * (y - ICC[1])) + ICC[1];
        let theta_new = theta + (omega * t);
        return [x_new, y_new, theta_new];
    }
    
    straightMotion (v, x, y, theta, t) {
        let x_new = x + (v * t * Math.cos(theta));
        let y_new = y + (v * t * Math.sin(theta));
        return [x_new, y_new, theta];
    }
    
    robotStep (r_l, r_r, L, u_l, u_r, x, y, theta, t) {
        let v_l = u_l * r_l;
        let v_r = u_r * r_r;
    
        if (v_l == v_r) {
            return this.straightMotion(v_l, x, y, theta, t);
        }

        let R = (L/2) * (v_l + v_r)/(v_r - v_l);
        let omega = (v_r - v_l)/L;
        let ICC = [x - R * Math.sin(theta), y + R * Math.cos(theta)];
    
        return this.forwardKinematics(R, omega, ICC, x,y, theta, t);

    }
    
    main () {
        this.time += this.t_step;
        let result = this.robotStep(this.r_l, this.r_r, this.L, this.u_l, this.u_r, this.x, this.y, this.theta, this.t_step);
        this.theta = result[2];
    
        console.log(result);
        return result;
    }



}
const p = new diff(2, 3, 3, 4, 4, 5, 5, 90);
p.main(2, 3, 3, 4, 4, 5, 5, 90)