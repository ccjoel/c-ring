var d3 = require('d3');
var assert = require('../assert').assert;

var GRAPH_RING_RADIUS_MULTIPLIER = require('../constants').GRAPH_RING_RADIUS_MULTIPLIER;

var nodesUnderCursor = require('../dom-handlers/nodes-under-cursor');

/**
 *
 * Creates ring for ring view, taking width/height as input and outputting the
 * radius of the graph, to be reused by drawNodes
 *
 * @param {!Number} width of container to determine/recalculate graph width
 * @param {!Number} height of container to determine/recalculate graph height
 * @param {Object} svgContainerTargetElementId an element into which append the svg. sample: `#ring-container`
 *
 * @returns {Object} configuration properties set up by this fuction, for `make` to reuse
 *
 * This function may fail for several reasons:
 * @throws AssertionError when receiving wrong dimensions (width/height)
 *
 * @author Joel Quiles
 * @since 2015-Nov-17
 */
module.exports = function(width, height, svgTargetElementId) {

  assert(typeof width === 'number', 'invalid container element width');
  assert(typeof height === 'number', 'invalid container element height');

  if(!!svgTargetElementId) {
    assert(typeof svgTargetElementId === 'string');
  }

  // target element defaults to body if not svgTarget provided
  var svgTarget = d3.select(svgTargetElementId || 'body');
  var radius = Math.min(width, height); // the ring is a circle, the minimum of both values will make

  var ringRadius = radius / GRAPH_RING_RADIUS_MULTIPLIER;

  // append svg element to container
  var svg = svgTarget.append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  // append the ring for the ring view
  svg.append("circle")
    .attr("class", "ring")
    .attr("r", ringRadius)
    .style("fill", "rgba(47, 37, 37, 0.99)"
  );

  // When you click an svg i will console.log all the tokens of nodes under the click
  document.querySelector('svg').addEventListener('mouseover', nodesUnderCursor);

  return {
    svg: svg,
    radius: radius
  };

}
