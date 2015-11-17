/**
 * @param {!Object} nodeListTa reference to the text area DOM element
 * @returns array of entered strings from text area
 */
module.exports = function (nodeListTA) {

  var nodesString = nodeListTA.value;

  // TODO: validate that input is good with a regex
  // TODO: if it isn't, return null
  // TODO: use regex to validate that input is of format ```"0", "485745"```,
  // basically a list of numbers as strings, separated by commas.

  var quote = '"';
  var regex = new RegExp(quote, 'g') ;

  var result = nodesString
    .replace(regex,"")
    .replace(" ", "", "g")
    .split(",");

  console.log('result', result);

  return result;
}
