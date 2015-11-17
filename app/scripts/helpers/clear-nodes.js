module.exports = function() {
  var nodes = document.querySelectorAll('circle:not(.ring)');
  if(nodes && nodes.length) {
    for(var i in nodes) {
      if(nodes.hasOwnProperty(i)) {
        nodes[i].parentNode.removeChild(nodes[i]);
      }
    }
  }
}
