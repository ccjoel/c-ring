/**
 *
 * Run OpsRing project into the dom in index.html. It should model or create a
 * visualization of the nodes in the cluster using a ring view.
 *
 * You can interact with the app using the text area and update button provided.
 *
 * You might also interact with it using the exposed
 * window.opsRing.redrawNodes fuction created later in this file.
 *
 * @author Joel Quiles
 * @since 2015-Nov-16
 */

// ---------------------------- constants --------------------------------------

var CLUSTER_NODES_TITLE_HEIGHT_USE = 60;


// ---------------------------- lib imports ------------------------------------

// include the required graph lib
var setupGraph = require('./draw-svg/setup-ring');
var drawNodes = require('./draw-svg/draw-all-nodes');
var clearPreviousNodes = require('./helpers/clear-nodes');
var createArrayFromTextAreaTokens = require('./helpers/array-from-tokens');
var resizeContainer = require('./helpers/resize-svg-container');

// ---------------------------- DOM elements -----------------------------------


// Grab the text area, to then get its contents
var nodeListTA = document.querySelector('#node-list-text-area');
var container = document.querySelector('main');
var updateBtn = document.querySelector('#update-ring-btn');
var ringContainer = document.querySelector('#ring-container');

var CONTAINER_PADDING = 15;

//normalize main container dimensions on start
function normalizeDimensions() {
  var headerHeight = document.querySelector('header').offsetHeight;
  if (container.offsetWidth > container.offsetHeight) {
    container.style.height = container.offsetWidth - (headerHeight) - CONTAINER_PADDING + "px";
  } else if (container.offsetHeight > container.offsetWidth) {
    container.style.width = container.offsetHeight + "px";
  }
}
normalizeDimensions();


// --------------------------- Initial State -----------------------------------

// Insert some default values into input box, so that we can see a graph
// at the start of the app.
nodeListTA.value = '"0", "85070591730234615865843651857942052864"';

// Create ring and find dimensions
var configuration = setupGraph(container.offsetWidth, container.offsetHeight - CLUSTER_NODES_TITLE_HEIGHT_USE, '#ring-container');

// call drawAllNodes to draw them into ring
drawNodes(createArrayFromTextAreaTokens(nodeListTA.value),
  configuration
);

var lastNodesValue = createArrayFromTextAreaTokens(nodeListTA.value);

console.log('Welcome.\nThe Ring nodes change color each time they are repainted,to a random color, just to make it more fun.');
console.log('\nYou may call window.opsRing.redrawNodes to change nodes to your pleasure.');
console.log('Sample use with input: window.opsRing.redrawNodes(["0", "85070591730234615865843651857942052864"])');

// -------------------------------- API ---------------------------------------
// expose API to window environment
window.opsRing = {
  redrawNodes: function(nodesArray) {
    try {
      clearPreviousNodes();
      drawNodes(nodesArray, configuration);
      lastNodesValue = nodesArray;
    } catch (e) {
      console.warn(e);
      alert(e.message);
    }
  }
};


// -------------------------- DOM event handlers -------------------------------


// handle button click event
updateBtn.addEventListener('click', function(e) {

  try {

    clearPreviousNodes(); // remove all prev nodes from svg
    if (nodeListTA.value === "") { // if textarea empty, do nothing
      return;
    }
    // get tokans as array
    var arrayOfTokens = createArrayFromTextAreaTokens(nodeListTA.value);

    // call draw with these new nodes
    drawNodes(arrayOfTokens, configuration);
    // update reference to last array of tokens
    lastNodesValue = arrayOfTokens;

  } catch (e) {
    console.warn(e);
    alert(e.message);
  }
});

// resize / remake graph on browser resize
window.addEventListener('resize', function() {
  // remove old svg graph
  var svg = document.querySelector('svg');
  if (svg) {
    svg.parentNode.removeChild(svg);
  }
  resizeContainer(document, window, container, CONTAINER_PADDING);
  // call setup again
  configuration = setupGraph(container.offsetWidth, container.offsetHeight - CLUSTER_NODES_TITLE_HEIGHT_USE, '#ring-container');
  // call draw again with last values
  window.opsRing.redrawNodes(lastNodesValue);
});
