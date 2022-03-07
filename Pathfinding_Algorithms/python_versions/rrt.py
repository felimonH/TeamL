###Input parameters:
#start: 2D coordinates
#goal: 2D coordinates 
#step_size: double larger than 0. Depending on your environment size, it probably makes sense to define a maximum value as well.
#collision_resolution: double larger than 0, depends on obstacle resolution and environment size. This is the distance between positions along the path being checked for obstacles.
#goal_resolution: double larger than 0, depends on obstacle resolution and environment size, potentially the same as collision_resolution. This is the minimum distance between a sample and the goal for the sample to be considered reaching the goal
#goal_biasing: probability in the interval [0,1]. With a probability of goal_biasing: a sample is created at the goal instead of in a random location. This speeds up the planning process
#obstacles: This definition depends on your obstacle design 
#environment_boundaries: 2 values representing the width and height of the environment
###Output:
#path: a list of nodes with the first element == start and the last element == goal
###User Input:
#Users should be able to influence the following parameters through the environment visualization: start, goal, obstacles
#In addition, users should be able to set the step_size and goal_biasing values through text boxes.

import math;
import random
from re import T
from tkinter.tix import Tree;

#-----------------------------------Binary Tree------------------------------------------------

class Node:

    def __init__(self, data):

        self.left = None
        self.right = None
        self.data = data

    def insert(self, data):
# Compare the new value with the parent node
        if self.data:
            if data < self.data:
                if self.left is None:
                    self.left = Node(data)
                else:
                    self.left.insert(data)
            elif data > self.data:
                if self.right is None:
                    self.right = Node(data)
                else:
                    self.right.insert(data)
        else:
            self.data = data

# Print the tree
    def PrintTree(self):
        if self.left:
            self.left.PrintTree()
        print( self.data),
        if self.right:
            self.right.PrintTree()


#---------------------------------------RRT Alg-------------------------------------------------

#Euclidean distance
def distance(p,q):
	return math.sqrt((p[0] - q[0])^2 + (p[1] - q[1])^2)


#Find the nearest node in the tree
def findNearest(p, T):
	min_dist = math.infinity
	nearest = []
	for n in T.nodes:		#iterating over all nodes in the tree structure to find the closest one
		d = distance(p,n)
		if d < min_dist:
			min_dist = d
			nearest = n
	return nearest

#take a step towards the new sample
def step(p, T, step_size):
	n = findNearest(p,T)
	d = distance(p,n)
	direction = (p - n)/d  #normalized direction vector from n to p
	new_n = n + (direction * step_size)	#take a step from n towards the sample
	return (n, new_n) #return new edge to new node  

#Test if p is located inside an obstacle
def collision(p, obstacles):
	for o in obstacles:
		if p in o:			#this depends on your obstacle definition
			return True
	return False

#Test if any location along an edge is located inside an obstacle, 
def collisionEdge(edge, obstacles, collision_resolution):
	d = distance(edge[0], edge[1]) 
	direction = (edge[1] - edge[0])/d 	#normalized direction
	num_steps = math.floor(d/collision_resolution)
	for s in range(num_steps+1):
		p = edge[0] + (collision_resolution * direction)
		if collision(p, obstacles):
			return True
	return False

#sample random 2D coordinates within the environment
def sampleRandom(environment_boundaries):
	rand_x = random.uniform(0,1) * environment_boundaries[0] #assuming that UniformSampler() samples from the interval [0,1]
	rand_y = random.uniform(0,1) * environment_boundaries[1] 
	return [rand_x, rand_y]

#Traverse the tree backward from the goal to the start and extract the path
def extractPath(T, new_node):
	current_node = new_node
	path = [new_node]
	while current_node != T.root:
		edge = current_node.incomingEdge()
		current_node = edge[0]
		path.insert(0, )


#main planning function for Rapidly Exploring Random Trees
def RRT(start, goal, step_size, collision_resolution, goal_resolution, goal_biasing, obstacles, environment_boundaries):
	T = Node(start)
	while not goal in T:
		if random.uniform(0,1) < goal_biasing:
			sample = goal_biasing							#sample at the goal
		else:
			sample = sampleRandom(environment_boundaries)	#sample a random location in the environment
		
		new_edge = step(sample, T, step_size)
		new_node = new_edge[1]

		#collision checks
		if not collision(new_node, obstacles):
			if not collisionEdge(new_edge, obstacles, collision_resolution):
				T.insert(new_node, new_edge)
				if distance(new_node,goal) < goal_resolution:
					path = extractPath(T, new_node)
					return path