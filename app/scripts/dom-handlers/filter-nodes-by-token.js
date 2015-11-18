
var cleanInput = require('../helpers/clean-input-numbers');

/**
 * Filter function is a dom event handler. The only use case for now, is to
 * run on filter button click. It will only show the particular node with token id
 * from the input box next to the filter button.
 *
 * @author Joel Quiles
 * @since 2015-Nov-17-
 */
exports.filter = function(e) {

  var input = document.querySelector('#filter-input');
  var cleanInputValue = cleanInput(input.value);
  var circleTarget = document.querySelector('.node'+cleanInputValue);
  var nodesToHide = document.querySelectorAll('.node:not(.node'+cleanInputValue+')');

  removeInvisibleClass(); // just preventing adding double 'invisible' classes

  for (var i in nodesToHide) {
    if(nodesToHide.hasOwnProperty(i) && i !== 'length') {
      nodesToHide[i].className.baseVal = nodesToHide[i].className.baseVal + ' invisible';
    }
  }

};
/**
 * Clear function is a dom event handler. The only use case for now, is to
 * clear previously filtered nodes.
 *
 * @author Joel Quiles
 * @since 2015-Nov-17-
 */
exports.clear = function() {
  removeInvisibleClass();
  // add extra pepper and clear the input box
  var input = document.querySelector('#filter-input');
  input.value = "";
}

/**
 * Simple function. Removes all `invisible` class from nodes previously hidden;
 * @author Joel Quiles
 * @since 2015-Nov-17
 */
function removeInvisibleClass() {

  var nodes = document.querySelectorAll('.invisible');

  for (var i in nodes) {
    if(nodes.hasOwnProperty(i) && i !== 'length') {
      nodes[i].className.baseVal = nodes[i].className.baseVal.replace('invisible', '').trim();
    }
  }
}
