
exports.filter = function(e) {

  var input = document.querySelector('#filter-input');
  var circleTarget = document.querySelector('.node'+input.value);
  var nodesToHide = document.querySelectorAll('.node:not(.node'+input.value+')');

  for (var i in nodesToHide) {
    if(nodesToHide.hasOwnProperty(i) && i !== 'length') {
      nodesToHide[i].className.baseVal = nodesToHide[i].className.baseVal + ' invisible';
    }
  }

};

exports.clear = function(e) {

  var input = document.querySelector('#filter-input');
  var nodes = document.querySelectorAll('.invisible');

  for (var i in nodes) {
    if(nodes.hasOwnProperty(i) && i !== 'length') {

      console.log('nodes[i].className.baseVal', nodes[i].className.baseVal);

      nodes[i].className.baseVal = nodes[i].className.baseVal.replace('invisible', '');
    }
  }

  input.value = "";

}
