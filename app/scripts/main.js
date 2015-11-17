/**
 *
 * Run OpsRing project into the dom in index.html
 *
 *
 * @author Joel Quiles
 * @since 2015-Nov-16
 */

// ---------------------------- constants --------------------------------------

var CLUSTER_NODES_TITLE_HEIGHT_USE = 60;


// --------------------------- npm imports --------------------------------------


// ---------------------------- lib imports ------------------------------------

// include the required graph lib
var setupGraph = require('./draw-svg/setup-ring');
var drawNodes = require('./draw-svg/draw-all-nodes');
var clearPreviousNodes = require('./helpers/clear-nodes');
var createArrayFromTextAreaTokens = require('./helpers/array-from-tokens');

// ---------------------------- DOM elements -----------------------------------

// Grab the text area, to then get its contents
var nodeListTA = document.querySelector('#node-list-text-area');
var container = document.querySelector('main');
var updateBtn = document.querySelector('#update-ring-btn');


// --------------------------- Initial State -----------------------------------

// Insert some default values into input box, so that we can see a graph
// at the start of the app.
nodeListTA.value = '"0", "170141183460469231731687303715884105728", "85070591730234615865843651857942052864"';

// Create ring and find dimensions
var configuration = setupGraph(container.offsetWidth, container.offsetHeight - CLUSTER_NODES_TITLE_HEIGHT_USE, '#ring-container');

// call drawAllNodes to draw them into ring
drawNodes(["170141183460469231731687303715884105728",
    "170141183460469231731687303715884105727",
    "90141183460469231700007303715884100000",
    "85070591730234615865843651857942052864",
    "42535295865117307932921825928971026431"
  ],
  configuration
);


// -------------------------------- API ---------------------------------------
// expose API to window environment
window.opsRing = {
  redrawNodes : function(nodesArray) {
    clearPreviousNodes();
    drawNodes(nodesArray, configuration);
  }
};


// -------------------------- DOM event handlers -------------------------------

// handle button click event
updateBtn.addEventListener('click', function(e) {
  console.log('Clicked update button!', nodeListTA.value, e);
  clearPreviousNodes();
  var arrayOfTokens = createArrayFromTextAreaTokens(nodeListTA);

  console.log('arrayofToken', arrayOfTokens, 'conf', configuration);

  // call draw with these nodes
  drawNodes(arrayOfTokens, configuration);

});


// TODO: resize / remake graph on browser resize
window.addEventListener('resize', function() {
  console.log('window resized!');
});
