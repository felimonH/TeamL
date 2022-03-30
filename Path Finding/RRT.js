import {tree, node} from "/Tree_Struct/treeAll.js";

class RRT {

    constructor (start, goal, step_size, collision_resolution, goal_resolution, goal_biasing, obstacles, environment_boundaries) {
        this.start = start;
        this.goal = goal;
        this.step_size = step_size;
        this.collision_resolution = collision_resolution;
        this.goal_resolution = goal_resolution;
        this.goal_biasing = goal_biasing;
        this.obstacles = obstacles;
        this.environment_boundaries = environment_boundaries;
    }


    distance(p, q) {
        return Math.sqrt( Math.pow(p[0]-q[0], 2) + Math.pow(p[1]-q[1], 2) );
    }
    
    findNearest(p, T) {
        min_dist = 0;
        let n = T.nodes[0];

        for ( let i = 0; i < T.nodes.length; i++ ) {
            let d = distance(p, T.nodes[i]);

            if ( min_dist > d || min_dist == 0 ) {
                min_dist = d;
                n.push(T.nodes[i]);
            }
        }

        return n;
    }

    step(p, T, step) {
        let n = this.findNearest(p, T);
        let d = distance(p, T);
        let direction = [(p[0] - n.x)/d + step, (p[1] - n.y)/d] + step;

        let new_n = node(n.getX() + direction[0], n.getY() + direction[1], n);
        return new_n;

    }
    
    // check perimeter only
    collision(n, T, perimeter) {

    }

    sampleRandom() {
        let rand_x = Math.random() * this.environment_boundaries[0];
        let rand_y = Math.random() * this.environment_boundaries[1];
        return [rand_x, rand_y];
    }

    extractPath( node ) {
        let current_n = node;
        let path = [];

        while ( current_n != null ) {
            path.push(current_n);
            current_n = current_n.incomingEdge();
        }
    }

    main () {
        let T = new tree();
        let root = new node(start[0], start[1], null);
        T.insert(root);

        while (true) {

            let sample;
            let range = Math.random();
            if ( range < this.goal_biasing ) {
                sample = [this.goal.getX() - range, this.goal.getY() - range];
            } else {
                sample = this.sampleRandom();
            }

            let new_node = step(sample, T, this.step_size);

            // need to know what "obstacle is definted as before writing code"
            if (!this.collision( new_node, this.obstacles)) {
                T.insert(new_node);
                let left = [new_node.getX(), new_node.getY()];
                let right = [this.goal.getX(), this.goal.getY()];
                let compare = this.distance(left, right);
                
                if ( compare[0] < this.goal_biasing && compare[1] < this.goal_biasing ) {
                    return extractPath(T, new_node);
                }
            } else {
                new_node.prev = null;
            }



        } 

        



    }




}