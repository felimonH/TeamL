class tree  {

    constructor () {
        this.root;
        this.nodes = [];
    }

    insert ( node ) {

        if ( root == null ) {
            this.root = node;
        }
        
        nodes.push(node);
    }

}

class node {

    constructor (x, y, prev) {
        this.prev = prev;
        this.x = x;
        this.y = y;
    }

    incomingEdge() {
        return this.prev;
    }

    getX() {
        return this.x;
    }

    getY () {
        return this.y;
    }


}
