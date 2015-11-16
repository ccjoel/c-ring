/**
 *
 * Run OpsRing project into the dom in index.html
 *
 *
 * @author Joel Quiles
 * @since 2015-Nov-16
 */

var CLUSTER_NODES_TITLE_HEIGHT_USE = 60;

// include the required graph lib
var graph = require('./graph');

var setupGraph = graph.setupRing;
var drawNodes = graph.drawAllNodes;

// Grab the text area, to then get its contents
var nodeListTA = document.querySelector('#node-list-text-area');

// Make the graph
var container = document.querySelector('main');

// Create ring and find dimensions
var configuration = setupGraph(container.offsetWidth, container.offsetHeight - CLUSTER_NODES_TITLE_HEIGHT_USE, '#ring-container');

// Insert some default values into input box, so that we can see a graph
// at the start of the app.
nodeListTA.value = '"0", "170141183460469231731687303715884105728", "85070591730234615865843651857942052864"';

/**
 * @returns array of entered strings from text area
 */
function createArrayFromTextAreaTokens() {

  var nodesString = nodeListTA.value;

  // TODO: validate that input is good with a regex
  // TODO: if it isn't, return null
  // TODO: use regex to validate that input is of format ```"0", "485745"```,
  // basically a list of numbers as strings, separated by commas.

  var quote = '"';
  var regex = new RegExp(quote, 'g') ;
  return nodesString.replace(re,"").split(", ");
}

function clearPreviousRing() {
  var svg = document.querySelector('svg');

  if(svg) {
    svg.parentNode.removeChild(svg);
  }
}

// call drawAllNodes to draw them into ring
drawNodes(["170141183460469231731687303715884105728",
    "170141183460469231731687303715884105727",
    "90141183460469231700007303715884100000",
    "85070591730234615865843651857942052864",
    "42535295865117307932921825928971026432"
  ],
  configuration
);



var updateBtn = document.querySelector('#update-ring-btn');

// handle button click event
updateBtn.addEventListener('click', function(e) {
  console.log('Clicked update button!', nodeListTA.value, e);

  var arrayOfTokens = createArrayFromTextAreaTokens();


});


// TODO: resize / remake graph on browser resize
window.addEventListener('resize', function() {
  console.log('window resized!');
});


// Finally, expose API to window environment
window.opsRing = graph;
