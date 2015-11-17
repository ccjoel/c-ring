module.exports = function addManyNodesTester(n) {

  var input = [];

  for(var i = 0; i < n; i++) {
    input.push(i+"");
  }

  window.opsRing.redrawNodes(input);
}
