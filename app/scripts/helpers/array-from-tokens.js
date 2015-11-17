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
 * @since 2015-Nov-16
 */
module.exports = function (nodesString) {

  // TODO: validate that input is good with a regex
  // TODO: if it isn't, return null
  // TODO: use regex to validate that input is of format ```"0", "485745"```,
  // basically a list of numbers as strings, separated by commas.

  var regexQuotes = new RegExp('"', 'g') ;
  var regexWhiteSpace = new RegExp(" ", 'g') ;

  var result = nodesString
    .replace(regexQuotes,"")
    .replace(regexWhiteSpace,"")
    .split(",");

  console.log('result', result);

  return result;
}
