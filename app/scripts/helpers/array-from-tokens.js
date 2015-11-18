
var cleanInput = require('./clean-input-numbers');

/**
 * Receives a node string, like the one from the input text area, given the format
 * from the specifications. It cleans up this input and stores into an array
 *
 * Example:
 *
 * Text area's contents are: "0", "357645765467"

 * If we don't clean the data, the array might turn out to be:
 * [' "4545" ', ' " 4" ']
 * etc
 *
 * Thus, this fuction returns it like so:
 *
 * ['4545', '4']  // with no spaces, commas, or quote characters
 *
 *
 * @param {!Object} nodeListTa reference to the text area DOM element
 * @returns array of entered strings from text area
 *
 * @author Joel Quiles
 * @since 2015-Nov-17
 */
module.exports = function (nodesString) {

  // ** this function used to be longer :-) **

  // basically a list of numbers as strings, separated by commas.
  // first, clean up. The input will be validated by draw-node later, if its an invalid token
  return cleanInput(nodesString).split(",");

}
