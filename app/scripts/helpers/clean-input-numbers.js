/**
 * Utility functions that receives a messy string of almost valid input,
 * and cleans it up. It removes ', ", enter characters, etc, from input.
 * @param {!String} input which is normally something like "'0',  '343',  '43434'"
 * @returns String cleanInputValue
 */
module.exports = function(input) {
  var regexDoubleQuotes = new RegExp('"', 'g') ;
  var regexQuotes = new RegExp("'", 'g') ;
  var regexWhiteSpace = new RegExp(" ", 'g') ;
  var regexEnter = new RegExp("↵", 'g');
  var regexEnterN = new RegExp("\n", 'g');

  var cleanInputValue = input
    .replace(regexQuotes,'')
    .replace(regexDoubleQuotes,'')
    .replace(regexWhiteSpace,'')
    .replace(regexEnter,'')
    .replace(regexEnterN,'');

  return cleanInputValue;
}
