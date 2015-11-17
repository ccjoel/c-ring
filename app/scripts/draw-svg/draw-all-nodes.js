
var assert = require('assert');
var drawNode = require('./draw-node');

/**
 * Function that calls drawNode and draws all nodes
 *
 * @param {!Array} nodesArray ann array of nodeTokens
 * @param {!Object} configuration receives an object with svg reference and radius of circle
 *
 * @throws {AssertionError} if not a valid node list array
 *
 * @author Joel Quiles
 * @since 2015-Nov-16
 */
module.exports = function(nodesArray, configuration) {
  assert(Array.isArray(nodesArray), 'invalid node list array');

  nodesArray.forEach(function(token, index, array){
    drawNode(token, configuration);
  });
}
