/**
* Small testing function for the sake of it.
* I passed 100 as n for example. And it loops and adds 100 nodes from 0 to 100 to document
* Careful with big numbers, that won't work with this.
*/
module.exports = function addManyNodesTester(n) {

  if(n > 1000) {
    return console.log('Psh. Please.');
  }

  var input = [];

  for(var i = 0; i < n; i++) {
    input.push(i+"");
  }

  window.opsRing.redrawNodes(input);
}
