/**
 * Renders one node on a ring view.
 * This is part of a small library that creates a replica of the OpsCenter ring
 * view given a list of cluster nodes
 * @author Joel Quiles
 * @since 2015-Nov-16
 */

// ------------------------------ NPM IMPORTS ----------------------------------

var assert = require('../assert').assert;         // node assertion library- in the browser!
var d3 = require('d3');                 // Used to create svg graphs
var randomRGB = require('randomcolor');         // Generate random colors for the node

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
 * token from the max allowed token, in  other to find the place in the Ring,
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
module.exports = function (nodeToken, configuration) {

  // validate token
  assert(nodeToken && typeof nodeToken === 'string', 'invalid nodeToken provided in draw-node');
  assert(!isNaN(parseInt(nodeToken, 10)), 'nodeToken provided is not a number in draw-node');
  // validate configuration
  assert(!!configuration.svg && !!configuration.radius, 'invalid configuration provided in draw-node');

  var radius = configuration.radius;
  var svg = configuration.svg;

  // Trivia night: the plural form of radius can be either radii or radiuses
  var nodeTokenArcRadius = radius / GRAPH_RING_RADIUS_MULTIPLIER;
  var nodeRadius = radius / GRAPH_NODE_RADIUS_MULTIPLIER;         // 18 was a magic number, playing with a ratio that made sense

  // Generate a random rgb color. Then force 0.3 transparency to see overlap of nodes, and change rgb to rgba format
  var randomColor = randomRGB({format: 'rgb'}).replace(new RegExp(/[)]$/), ', 0.3)').replace('rgb', 'rgba');

  // insert node into svg, positioning at ring arc.
  svg.append("circle")        // nodes are visualized as circles in the ring view
    .attr("class", "node"+nodeToken+" node")
    .attr("r", nodeRadius)    // Set radius of the node
    // move node's center to the ring's arc radius
    .attr("transform", "translate(0," + -nodeTokenArcRadius + ")")
    .style("fill", randomColor);

  // Current position of node (an arc around the ring), with bigger arc when
  // bigger ratio to the max allowed token
  var nodeTokenPosition = d3.svg.arc()
    .startAngle(0)
    .endAngle(0);

  var ratio = getRatioOfToken(nodeToken); // ratio between the provided node token value and max token

  if(ratio === 0) { // unable to divide by 0, we know the ratio by now
    ratio = 1.0;
  }

  // position of circle as radians
  var positionInCircle = 2 * Math.PI / ratio;

  // create a function that uses the end angle 9 (in radians) and the position of element in circle
  var interpolateNodePosition = d3.interpolate(nodeTokenPosition.endAngle()(), positionInCircle);

  // get x and y values of coordinates, using start and end angles
  var x = Math.cos(interpolateNodePosition(UNIT_CIRCLE_RADIUS) - nodeTokenPosition.startAngle()()); // x coordinate of angle, using cosine to get this value
  var y = Math.sin(interpolateNodePosition(UNIT_CIRCLE_RADIUS) - nodeTokenPosition.startAngle()()); // y coordinate of angle, using sine to get this value

  // translate node along arc to its position
  d3.select(".node"+nodeToken)
    .attr("transform", "translate(" + nodeTokenArcRadius * y + "," + -nodeTokenArcRadius * x + ")");

  // previously only logged one token
  document.querySelector(".node"+nodeToken).addEventListener('click', function(){
    console.log('Clicked: '+ nodeToken);
  });
}
