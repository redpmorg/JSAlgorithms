/**
 * A Graph data structure consists of a finite (and possibly mutable) set of
 * vertices or nodes or points, together with a set of unordered pairs of these
 * vertices for an undirected Graph or a set of ordered pairs for a directed Graph.
 * These pairs are known as edges, arcs, or lines for an undirected Graph and as
 * arrows, directed edges, directed arcs, or directed lines for a directed Graph.
 * The vertices may be part of the Graph structure, or may be external entities
 * represented by integer indices or references.
 *
 * Representation
 * --------------
 * There are different ways of representing a graph, each of them with its own
 * advantages and disadvantages. Here are the main 2:
 * - Adjacency list: For every vertex a list of adjacent vertices is stored. This
 *   can be viewed as storing the list of edges. This data structure allows the
 *   storage of additional data on the vertices and edges.
 * - Adjacency matrix: Data are stored in a two-dimensional matrix, in which the
 *   rows represent source vertices and columns represent destination vertices.
 *   The data on the edges and vertices must be stored externally.
 *
 * Complexity
 * ----------
 * Adjacency list
 * Storage		Add Vertex	Add Edge	Query
 * O(|V|+|E|)	   O(1)		  O(1)	    O(|V|)
 *
 * Adjacency matrix
 * Storage	Add Vertex	Add Edge	Query
 * O(|V|^2)	 O(|V|^2)  	  O(1)		O(1)
 *
 *
 *        [6]
 *          \
 *          [4]---[5]
 *           |     | \
 *           |     |  [1]
 *          [3]---[2]/
 */

function Graph() {
  this.vertices = [];
  this.edges = [];
  this.numberOfEdges = 0;
}

Graph.prototype.addVertex = function(vertex) {
  this.vertices.push(vertex);
  this.edges[vertex] = [];
};

Graph.prototype.removeVertex = function(vertex) {
  var index = this.vertices.indexOf(vertex);
  if(~index) {
    this.vertices.splice(index, 1);
  }
  while(this.edges[vertex].length) {
    var adjacentVertex = this.edges[vertex].pop();
    this.removeEdge(adjacentVertex, vertex);
  }
};

Graph.prototype.addEdge = function(vertex1, vertex2) {
  this.edges[vertex1].push(vertex2);
  this.edges[vertex2].push(vertex1);
  this.numberOfEdges++;
};

Graph.prototype.removeEdge = function(vertex1, vertex2) {
  var index1 = this.edges[vertex1] ? this.edges[vertex1].indexOf(vertex2) : -1;
  var index2 = this.edges[vertex2] ? this.edges[vertex2].indexOf(vertex1) : -1;
  if(~index1) {
    this.edges[vertex1].splice(index1, 1);
    this.numberOfEdges--;
  }
  if(~index2) {
    this.edges[vertex2].splice(index2, 1);
  }
};

Graph.prototype.size = function() {
  return this.vertices.length;
};

Graph.prototype.relations = function() {
  return this.numberOfEdges;
};

Graph.prototype.traverseDFS = function(vertex, fn) {
  if(!~this.vertices.indexOf(vertex)) {
    return console.log('Vertex not found');
  }
  var visited = [];
  this._traverseDFS(vertex, visited, fn);
};

Graph.prototype._traverseDFS = function(vertex, visited, fn) {
  visited[vertex] = true;
  if(this.edges[vertex] !== undefined) {
    fn(vertex);
  }
  for(var i = 0; i < this.edges[vertex].length; i++) {
    if(!visited[this.edges[vertex][i]]) {
      this._traverseDFS(this.edges[vertex][i], visited, fn);
    }
  }
};

Graph.prototype.traverseBFS = function(vertex, fn) {
  if(!~this.vertices.indexOf(vertex)) {
    return console.log('Vertex not found');
  }
  var queue = [];
  queue.push(vertex);
  var visited = [];
  visited[vertex] = true;

  while(queue.length) {
    vertex = queue.shift();
    fn(vertex);
    for(var i = 0; i < this.edges[vertex].length; i++) {
      if(!visited[this.edges[vertex][i]]) {
        visited[this.edges[vertex][i]] = true;
        queue.push(this.edges[vertex][i]);
      }
    }
  }
};

Graph.prototype.pathFromTo = function(vertexSource, vertexDestination) {
  if(!~this.vertices.indexOf(vertexSource)) {
    return console.log('Vertex not found');
  }
  var queue = [];
  queue.push(vertexSource);
  var visited = [];
  visited[vertexSource] = true;
  var paths = [];

  while(queue.length) {
    var vertex = queue.shift();
    for(var i = 0; i < this.edges[vertex].length; i++) {
      if(!visited[this.edges[vertex][i]]) {
        visited[this.edges[vertex][i]] = true;
        queue.push(this.edges[vertex][i]);
        // save paths between vertices
        paths[this.edges[vertex][i]] = vertex;
      }
    }
  }
  if(!visited[vertexDestination]) {
    return undefined;
  }

  var path = [];
  for(var j = vertexDestination; j != vertexSource; j = paths[j]) {
    path.push(j);
  }
  path.push(j);
  return path.reverse().join('-');
};

Graph.prototype.print = function() {
  console.log(this.vertices.map(function(vertex) {
    return (vertex + ' -> ' + this.edges[vertex].join(', ')).trim();
  }, this).join(' | '));
};

var graph = new Graph();
graph.addVertex(1);
graph.addVertex(2);
graph.addVertex(3);
graph.addVertex(4);
graph.addVertex(5);
graph.addVertex(6);
graph.print(); // 1 -> | 2 -> | 3 -> | 4 -> | 5 -> | 6 ->
graph.addEdge(1, 2);
graph.addEdge(1, 5);
graph.addEdge(2, 3);
graph.addEdge(2, 5);
graph.addEdge(3, 4);
graph.addEdge(4, 5);
graph.addEdge(4, 6);
graph.print(); // 1 -> 2, 5 | 2 -> 1, 3, 5 | 3 -> 2, 4 | 4 -> 3, 5, 6 | 5 -> 1, 2, 4 | 6 -> 4
console.log('graph size (number of vertices):', graph.size()); // => 6
console.log('graph relations (number of edges):', graph.relations()); // => 7
graph.traverseDFS(1, function(vertex) { console.log(vertex); }); // => 1 2 3 4 5 6
console.log('---');
graph.traverseBFS(1, function(vertex) { console.log(vertex); }); // => 1 2 5 3 4 6
graph.traverseDFS(0, function(vertex) { console.log(vertex); }); // => 'Vertex not found'
graph.traverseBFS(0, function(vertex) { console.log(vertex); }); // => 'Vertex not found'
console.log('path from 6 to 1:', graph.pathFromTo(6, 1)); // => 6-4-5-1
console.log('path from 3 to 5:', graph.pathFromTo(3, 5)); // => 3-2-5
graph.removeEdge(1, 2);
graph.removeEdge(4, 5);
graph.removeEdge(10, 11);
console.log('graph relations (number of edges):', graph.relations()); // => 5
console.log('path from 6 to 1:', graph.pathFromTo(6, 1)); // => 6-4-3-2-5-1
graph.addEdge(1, 2);
graph.addEdge(4, 5);
console.log('graph relations (number of edges):', graph.relations()); // => 7
console.log('path from 6 to 1:', graph.pathFromTo(6, 1)); // => 6-4-5-1
graph.removeVertex(5);
console.log('graph size (number of vertices):', graph.size()); // => 5
console.log('graph relations (number of edges):', graph.relations()); // => 4
console.log('path from 6 to 1:', graph.pathFromTo(6, 1)); // => 6-4-3-2-1