// #Bicycle Robot Model
// ############################################################
// #THE BICYCLE IS EXACTLY THE SAME AS THE TRICYCLE, WITH L=0
// #(the distance between the two back wheels is 0, representing only one wheel)
// ############################################################
// #Input:
// #Input Vehicle parameters:


// #Control Input parameters:



// #Robot State Input parameters
// #(x,y) = initial robot position in 2D, measured at the center between the two back wheels
// #theta = initial robot orientation, angle counterclockwise from the x-axis

// #Output: New robot state



// #The following input parameters should be reflected in the visualization of the robot model:
// #r, alpha, d
// #r = radius of the front wheel
// #d = distance between the front wheel and the two back wheels
// #u = front wheel angular velocity
// #alpha = steering angle of the front wheel
// #(x,y) = position in 2D
// #theta = angle body with respect to the x-axis
class cycles {

    constructor(r, d, u, alpha, x, y, theta, L) {
        this.u = u;
        this.d = d;
        this.r = r;
        this.alpha = alpha;
        this.x = x;
        this.y = y;
        this.theta = theta;
        this.time = 0;
        this.t_step = 0.1;
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

        if ( alpha == 0 ) {
            return this.straightMotion(v, x, y, theta, t);
        } else if ( Math.abs(alpha) >= 3.14 ) {
            // no need to go past pi for turning, also avoids limit theorem problem with the Math.tan() function
            // in the variable R
            return this.straightMotion(-v, x, y, theta, t);
        }
        
        let R = d * Math.tan((Math.PI/2) - alpha);
        let omega = v/Math.sqrt(d**2 + R**2);
        let ICC = [x - R * Math.sin(theta), y + R * Math.cos(theta)];
    
        return this.forwardKinematics(R, omega, ICC, x,y, theta, t);
    
    }
    
    main() {
        this.time += this.t_step;
        let result = this.robotStep(this.r, this.d, this.u, this.alpha, this.x, this.y, this.theta, this.t_step);
        [this.x, this.y, this.theta] = result;

        console.log(result);
        return result;
    
    }

}


export default cycles;