
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

var graph = require('./graph');

var setupGraph = graph.setupRing;
var drawNodes = graph.drawAllNodes;

var nodeListTA = document.querySelector('#node-list-text-area');

// Make the graph
var container = document.querySelector('main');
var configuration = setupGraph(container.offsetWidth, container.offsetHeight - CLUSTER_NODES_TITLE_HEIGHT_USE, '#ring-container', d3);

// Insert some default values into input box, so that we can see a graph
// at the start of the app.
nodeListTA.value = '"0", "359836465"';

// TODO: parse items in list, creating an array of strings


// call drawAllNodes
drawNodes(["170141183460469231731687303715884105728",
           "170141183460469231731687303715884105727",
           "90141183460469231700007303715884100000",
           "85070591730234615865843651857942052864",
           "42535295865117307932921825928971026432"],
           configuration
         );


// TODO: use regex to validate that input is of format ```"0", "485745"```,
// basically a list of numbers as strings, separated by commas.


// TODO: handle update button click event
var updateBtn = document.querySelector('#update-ring-btn');
updateBtn.addEventListener('click', function(e){
  console.log('Clicked update button!', nodeListTA.value, e );
})


// TODO: resize / remake graph on browser resize
window.addEventListener('resize', function(){
  console.log('window resized!');
});


// Finally, expose API to window environment
window.opsRing = graph;
