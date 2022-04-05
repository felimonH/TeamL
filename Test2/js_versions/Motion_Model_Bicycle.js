// #Bicycle Robot Model
// ############################################################
// #THE BICYCLE IS EXACTLY THE SAME AS THE TRICYCLE, WITH L=0
// #(the distance between the two back wheels is 0, representing only one wheel)
// ############################################################
// #Input:
// #Input Vehicle parameters:
// #r = radius of the front wheel
// #d = distance between the front wheel and the two back wheels
// #L = 0 (only one back wheel)

// #Control Input parameters:
// #u = front wheel angular velocity
// #alpha = steering angle of the front wheel

// #Robot State Input parameters
// #(x,y) = initial robot position in 2D, measured at the center between the two back wheels
// #theta = initial robot orientation, angle counterclockwise from the x-axis

// #Output: New robot state
// #(x,y) = position in 2D
// #theta = angle with respect to the x-axis

// #The following input parameters should be reflected in the visualization of the robot model:
// #r, alpha, d
class cycles {

    constructor(r, d, u, alpha, x, y, theta, L) {
        this.u = u;
        this.d = d;
        this.r = r;
        this.alpha = alpha;
        this.x = x;
        this.y = y;
        this.theta = theta;
    }

    forwardKinematics(R, omega, ICC, x, y, theta, t) {
        let x_new = (Math.cos(omega * t) * (x - ICC[0])) + (-Math.sin(omega * t) * (y - ICC[1])) + ICC[0];
        let y_new = (Math.sin(omega * t) * (x - ICC[0])) + (Math.cos(omega * t) * (y - ICC[1])) + ICC[1];
        let theta_new = theta + (omega * t);
    
        return [x_new, y_new, theta_new];
    }
    
    straightMotion(v, x, y, theta, t) {
        let x_new = x + (v * t * Math.cos(theta));
        let y_new = y + (v * t * Math.sin(theta));
        return [x_new, y_new, theta]
    }
    
    robotStep(r, d, u, alpha, x, y, theta, t) {
        let v = u*r;
        let result = [];
    
    
        if ( alpha == 0 ) {
        
            result = this.straightMotion(v, x, y, theta, t);
        
        } else {
        
            let R = d * Math.tan((np.pi/2) - alpha);
            let omega = v/Math.sqrt(d**2 + R**2);
            let ICC = [x - R * Math.sin(theta), y + R * Math.cos(theta)];
    
            result = this.forwardKinematics(R, omega, ICC, x,y, theta, t);
        
        }
    
        return result;
    }
    
    main(x, y, r, d, u, alpha, theta) {
        let robot_path = [];
    
        let t = 0;
        let t_step = 0.1;
    
        robot_path.push([x, y]);
    
        let loopy = 0;
    
        while ( loopy < 50 ) {
            t += t_step;
            let result = this.robotStep(r, d, u, alpha, x, y, theta, t_step);
            robot_path.push([result[0], result[1]]);
            loopy += 1;
        }
    
        console.log(robot_path);
        console.log("");
    
    }
//n
}
export default cycles;