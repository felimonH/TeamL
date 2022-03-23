class node {

    constructor (parent, edge) {
        this.parent = parent;
        this.edge = edge
    }

    getEdge () {
        return edge;
    }

    getParent () {
        return parent;
    }

    incomingEdge() {
        return this.parent.edge[0];   
    }


}