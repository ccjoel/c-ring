
/**
*
* Description goes here
*
* @summary
*
*
* @author Joel Quiles
* @since 2015-Nov-16
*/

var CLUSTER_NODES_TITLE_HEIGHT_USE = 60;

var setupGraph = require('./graph').setupRing;
var drawGraph = require('./graph').drawNode;

var nodeListTA = document.querySelector('#node-list-text-area');


// Insert some default values into input box, so that we can see a graph
// at the start of the app.

// var width = elementForDimensions.offsetWidth,
//   height = elementForDimensions.offsetHeight;

// if the target or parent does not have a set width or height, set defaults
// if(!(height && width)) {
//   height = 500;
//   width = height;
// }

// Make the graph

var container = document.querySelector('main');
var configuration = setupGraph(container.offsetWidth, container.offsetHeight - CLUSTER_NODES_TITLE_HEIGHT_USE, '#ring-container', d3);

// TODO: use regex to validate that input is of format ```"0", "485745"```,
// basically a list of numbers as strings, separated by commas.

nodeListTA.value = '"0", "359836465"';

drawGraph(["0", "359836465"], configuration);

// TODO: handle update button click event
var updateBtn = document.querySelector('#update-ring-btn');
updateBtn.addEventListener('click', function(e){
  console.log('Clicked update button!', nodeListTA.value, e );
})


// TODO: parse items in list, creating an array of strings

// TODO: resize / remake graph on browser resize
window.addEventListener('resize', function(){
  console.log('window resized!');
})

// TODO: Maybe add a random color generator function, and each node can have a diff random rgb color


// TODO: finally, expose API to window environment
