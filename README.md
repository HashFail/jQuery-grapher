jQuery Grapher
--------------

A small jQuery plugin for drawing graphs on HTML canvas elements. 

# Usage

## Initialization

Create the grapher by object calling $("#canvas").grapher(options);

The options parameter is an object that accepts the following inputs: 

xMin: the minimum value on the x-axis of the graph. Defaults to 10. 

xMax: the maximum value on the x-axis of the graph. Defaults to 10.

yMin: the minimum value on the y-axis of the graph. Defaults to 10.

yMax: the maximum value on the y-axis of the graph. Defaults to 10.

axisWidth: the width of the graph's axes. Defaults to 1. 

axisColor: the color of the graph's axes. Defaults to black. 

## Methods

### .grapher()
Returns the grapher object. 

### .drawGraph(func, options) or .grapher().drawGraph(func, options)
Draws a graph of the fuction provided.

#### Parameters: 

func: a function that accepts one number parameter and returns a number.

options: an object that accepts the following inputs:

lineWidth: the width of the graph's axes. Defaults to 1. 

lineColor: the color of the graph's axes. Defaults to black. 

### .plot(elem, x, y)
Places the specified element at the given coordinates on the graph. 

#### Parameters
elem: the element to be placed. 

x: the x coordinate to place the element on the graph. 

y: the y coordinate to place the element on the graph.

### .destroyGrapher() or .grapher().destroy()
Removes the reference to the grapher. Returns the grapher object. 

## Helper methods

### .grapher().getX(x)
Returns the left offset (in pixels) of the specified x coordinate on the graph relative to the canvas object. 

### .grapher().getY(y)
Returns the top offset (in pixels) of the specified y coordinate on the graph relative to the canvas object. 
