/**
 * Small library that creates a replica of the OpsCenter ring view given a list of cluster nodes
 * @author Joel Quiles
 * @since 2015-Nov-16
 */

// ------------------------------ IMPORTS --------------------------------------

var BigNumber = require('big-number').n; // to work with BIG numbers in javascript :)
// Supported BigNumber methods: add/plus, minus/subtract, multiply/mult, divide/div, power/pow, mod, equals, lt, lte, gt, gte, isZero, abs
// Sample : var big = BigNumber(5).plus(97).minus(53).plus(434).multiply(5435423).add(321453).multiply(21).div(2).pow(2);
// Sample out: 760056543044267246001 // when converting to string
var assert = require('assert');         // node assertion library- in the browser!
var d3 = require('d3');                 // Used to create svg graphs


// ----------------------------- file globals ----------------------------------

var MAX_TOKEN = BigNumber(2).pow(127)+""; // 2^127 is biggest token value
// 2^ 126 = 85070591730234615865843651857942052864
var UNIT_CIRCLE_RADIUS = 1; // max value in graph circle

var GRAPH_RING_RADIUS_MULTIPLIER = 2.5;

var GRAPH_NODE_RADIUS_MULTIPLIER = 18;

// ------------------------------ Functions ------------------------------------

/**
 *
 * Description of setup function goes here
 *
 * @summary
 *
 * @param {!Number} width of container to determine/recalculate graph width
 * @param {!Number} height of container to determine/recalculate graph height
 * @param {Object} svgContainerTargetElementId an element into which append the svg. sample: `#ring-container`
 *
 * @returns {Object} configuration properties set up by this fuction, for `make` to reuse
 *
 * This function may fail for several reasons:
 * @throws AssertionError when receiving wrong dimensions
 *
 * @author Joel Quiles
 * @since 2015-Nov-16
 */


exports.setupRing = function(width, height, svgTargetElementId) {

  assert(typeof width === 'number', 'invalid container element width');
  assert(typeof height === 'number', 'invalid container element height');

  // target element defaults to body if not svgTarget provided
  var svgTarget = d3.select(svgTargetElementId || 'body');
  var radius = Math.min(width, height); // the ring is a circle, the minimum of both values will make

  var ringRadius = radius / GRAPH_RING_RADIUS_MULTIPLIER;

  // svg
  var svg = svgTarget.append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  // ring
  svg.append("circle")
    .attr("class", "ring")
    .attr("r", ringRadius)
    .style("fill", "rgba(20, 104, 110, 1.0)");

  return {
    svg: svg,
    radius: radius
  };

}

/**
 * Draw a node, given a token/id. It needs to find the ratio of the given
 * token from the max allowed token, in  other to find the place in the Ring,
 * using trigonometry.
 *
 * The maximum token id allowed is 2^127. There's one computer science challenge:
 * javascript's max number is 2^53-1
 *
 * From ECMA Section 8.5 - Numbers:
 * > Note that all the positive and negative integers whose magnitude is no
 * > greater than 2^53 are representable in the Number type...
 *
 * ES6 defines it as Number.MAX_SAFE_INTEGER.
 *
 *
 *
 * @summary
 * @param {!Array} nodeArray list of strings with node tokens
 *
 * @author
 * @since
 */

exports.drawNode = function(nodeToken, configuration) {

  assert(!!nodeToken && typeof nodeToken !== 'string', 'invalid nodeToken provided');
  assert(!!configuration.svg && !!configuration.radius, 'invalid configuration provided');

  var radius = configuration.radius;
  var svg = configuration.svg;

  // Trivia night: the plural form of radius can be either radii or radiuses
  var nodeTokenArcRadius = radius / GRAPH_RING_RADIUS_MULTIPLIER;
  var nodeRadius = radius / GRAPH_NODE_RADIUS_MULTIPLIER;         // 18 was a magic number, playing with a ratio that made sense

  // insert node into svg, positioning at ring arc.
  svg.append("circle")        // nodes are visualized as circles in the ring view
    .attr("class", "node")
    .attr("r", nodeRadius)    // Set radius of the node
    // move node's center to the ring's arc radius
    .attr("transform", "translate(0," + -nodeTokenArcRadius + ")")
    .style("fill", "rgba(113, 170, 255, 0.5)");

  // Current position of node (an arc around the ring), with bigger arc when
  // bigger ratio to the max allowed token
  var nodeTokenPosition = d3.svg.arc()
    .outerRadius(nodeTokenArcRadius + 1)
    .innerRadius(nodeTokenArcRadius - 1)
    .startAngle(0)
    .endAngle(0);
  svg.append("path")
    .attr("class", "nodeTokenPosition")
    .attr("d", nodeTokenPosition)
    .style("fill", "rgba(55, 104, 0, 0.75)");

  // TODO: pass token parameter
  var ratio = getRatioOfBigNumbers(); // ratio between the provided node token value and max token
  var positionInCircle = 2 * Math.PI * ratio;

  // create a function that uses the end angle and the position of element in circle
  var interpolateNodePosition = d3.interpolate(nodeTokenPosition.endAngle()(), positionInCircle);

  var x = Math.cos(interpolateNodePosition(UNIT_CIRCLE_RADIUS) - nodeTokenPosition.startAngle()()); // x coordinate of angle, using cosine to get this value
  var y = Math.sin(interpolateNodePosition(UNIT_CIRCLE_RADIUS) - nodeTokenPosition.startAngle()()); // y coordinate of angle, using sine to get this value

  d3.select(".node")
    .attr("transform", "translate(" + nodeTokenArcRadius * y + "," + -nodeTokenArcRadius * x + ")");

}

function getRatioOfBigNumbers(token) {
  return .5;
}


// TODO: write a function that calls drawNode and draws all nodes
exports.drawAllNodes = function(nodesArray) {
  assert(Array.isArray(nodesArray), 'invalid node list array');

  // nodesArray.forEach(function(token, index, array){
  //
  // });

}
