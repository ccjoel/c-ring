
var expect = require('chai').expect;
var graph = require('../scripts/graph');
var setupGraph = graph.setupRing;
var drawGraph = graph.drawNode;


describe('Setting up graph ring', function(){

  var nodelist = [];
  var containerElement = {id: 'ring-container',
                          width: 540,
                          height: 540};

});

describe('Draw one graph node', function(){

  beforeEach(function(){
    nodelist = ['0', '3453763', '358765736535'];
  });

  it('should throw error when passing non-object or empty configuration');
  it('should throw an error when nodeList array of nodes contains weird array elements (non string that translate into numbers)');

});

describe('Draw all graph nodes', function() {
  it('should throw an error when nodeList array of nodes if not of type array');
  // , function(){
  //   try{
  //     drawAllNodes("hello");
  //   } catch(e) {
  //     expect(e.name).to.equal('AssertionError');
  //     expect(e.message).to.equal('invalid node list array');
  //   }
  // });
})
