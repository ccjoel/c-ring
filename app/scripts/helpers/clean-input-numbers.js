
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
