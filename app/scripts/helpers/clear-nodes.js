/**
 * This function removes all nodes from the svg, to prepare to add new ones with
 * different token values.
 *
 * @author Joel Quiles
 * @since 2015-Nov-16
 */

module.exports = function() {
  var nodes = document.querySelectorAll('circle:not(.ring)');
  if(nodes && nodes.length) {
    for(var i in nodes) {
      if(nodes.hasOwnProperty(i)) {
        // TODO: remove click listener. just in case
        // nodes[i].removeEventListener('click');
        // remove node from parent svg -> g element
        nodes[i].parentNode.removeChild(nodes[i]);
      }
    }
  }
}
