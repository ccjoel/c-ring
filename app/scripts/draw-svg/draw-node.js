/**
 * Renders one node on a ring view.
 * This is part of a small library that creates a replica of the OpsCenter ring
 * view given a list of cluster nodes
 * @author Joel Quiles
 * @since 2015-Nov-17
 */

// ------------------------------ NPM IMPORTS ----------------------------------

var assert = require('../assert').assert; // node assertion library- in the browser!
var d3 = require('d3'); // Used to create svg graphs
var randomRGB = require('randomcolor'); // Generate random colors for the node

// ------------------------------ lib imports ----------------------------------

var getRatioOfToken = require('../helpers/token-ratio');

// ----------------------------- file globals ----------------------------------

var UNIT_CIRCLE_RADIUS = 1; // max radius value in graph circle
// To modify size of ring or nodes
var GRAPH_RING_RADIUS_MULTIPLIER = require('../constants').GRAPH_RING_RADIUS_MULTIPLIER;
var GRAPH_NODE_RADIUS_MULTIPLIER = require('../constants').GRAPH_NODE_RADIUS_MULTIPLIER;

// ------------------------------ Functions ------------------------------------


/**
 * Draw a node, given a token/id. It needs to find the ratio of the given
 * token from the max allowed token, in other to find the place in the Ring,
 * using trigonometry.
 *
 * @param {!Array} nodeArray list of strings with node tokens
 * @param {!Object} configuration which includes a reference to svg element and radius of circle
 *
 * Might throw this error type:
 * @throws AssertionError if nodeToken is not a string, and there is no svg or radius in its configuration
 *
 * @author Joel Quiles
 * @since 2015-Nov-16
 */
module.exports = function(nodeToken, configuration) {

  // validate token
  assert(nodeToken && typeof nodeToken === 'string', 'invalid nodeToken provided in draw-node');
  assert(!isNaN(parseInt(nodeToken, 10)), 'nodeToken provided is not a number in draw-node');
  // validate configuration
  assert(!!configuration.svg && !!configuration.radius, 'invalid configuration provided in draw-node');

  // These configurations created in setup-ring.js
  var radius = configuration.radius;
  var svg = configuration.svg;
  // Playing with ratio to get nice node size - change in constants.js
  var nodeTokenArcRadius = radius / GRAPH_RING_RADIUS_MULTIPLIER;
  var nodeRadius = radius / GRAPH_NODE_RADIUS_MULTIPLIER;

  // Current position of node (an arc around the ring), with bigger arc when
  // bigger ratio to the max allowed token
  var nodeTokenPosition = d3.svg.arc()
    .startAngle(0)
    .endAngle(0);

  // ratio between the provided node token value and max token
  var ratio = getRatioOfToken(nodeToken);

  // unable to divide by 0. If it's 0 then it's ~almost the same as 1
  ratio = (ratio === 0) ? 1.0 : ratio;
  // position of circle as radians
  var positionInCircle = 2 * Math.PI / ratio;

  // create a function that uses the end angle 9 (in radians) and the position of element in circle
  var interpolateNodePosition = d3.interpolate(nodeTokenPosition.endAngle()(), positionInCircle);

  // get x and y values of coordinates, using start and end angles
  var x = Math.cos(interpolateNodePosition(UNIT_CIRCLE_RADIUS) - nodeTokenPosition.startAngle()()); // x coordinate of angle, using cosine to get this value
  var y = Math.sin(interpolateNodePosition(UNIT_CIRCLE_RADIUS) - nodeTokenPosition.startAngle()()); // y coordinate of angle, using sine to get this value

  // Generate a random rgb color. Then force 0.3 transparency to see overlap of nodes, and change rgb to rgba format
  var randomColor = randomRGB({
    format: 'rgb'
  }).replace(new RegExp(/[)]$/), ', 0.3)').replace('rgb', 'rgba');

  // insert node into svg, positioning at ring arc.
  svg.append("circle") // nodes are visualized as circles in the ring view
    .attr("class", "node" + nodeToken + " node")
    .attr("r", nodeRadius) // Set radius of the node
    // translate node along arc to its position
    .attr("transform", "translate(" + nodeTokenArcRadius * y + "," + -nodeTokenArcRadius * x + ")")
    .style("fill", randomColor);

  // previously added token normal javascript reference
  var node = document.querySelector(".node" + nodeToken);

  // Add click listener in case
  node.addEventListener('click', function() {
    console.log('Clicked Node Token: ', nodeToken);
  });

  // This was a weird handler, that would move the nodes out of the way when hovering over there,
  // only when there were multiple nodes overlapping. It was weird in the sense that it was yanky,
  // they would jump around and not get back to their original location. We can come up with something
  // better later

  /*
   * Space out tokens when they are on top of each other*/
  // node.spaceOut = function() {
  //   // TODO: pass element so that we don't need to use a d3 selector
  //   // TODO: Better algorithm. This one is super simple for demo/interview/exercise
  //   var constantPositionTranform = 50;
  //   var randomX = getRandomArbitrary(-120, 120) > 80 ? 1 : -1;
  //   var randomY = getRandomArbitrary(-30, 30) > 15 ? 1 : -1;
  //   d3.select(".node" + nodeToken)
  //     .attr("transform", "translate(" +
  //       (nodeTokenArcRadius +
  //       (constantPositionTranform*randomY)) * y +
  //       "," +
  //       (-nodeTokenArcRadius - (constantPositionTranform*randomX)) * x +
  //       ")");
  // };

  // node.spaceBackIn = function() {
  //   d3.select(".node" + nodeToken)
  //     .attr("transform", "translate(" +
  //       nodeTokenArcRadius * y + "," + -nodeTokenArcRadius * x + ")")
  // }

}; // end draw-node

// from : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
// Returns a random number between min (inclusive) and max (exclusive)
// Original name: getRandomArbitrary
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
