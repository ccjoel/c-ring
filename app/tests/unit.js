
var expect = require('chai').expect;
var graph = require('../scripts/graph');
var setupGraph = graph.setupRing;
var drawGraph = graph.drawNode;
var getRatioOfToken = graph.getRatioOfToken;

var big = require('big-number').n;

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
});

describe('test bigNumber package', function(){
  // 2^126
  var inputToken = '85070591730234615865843651857942052864';
  // 2^127
  var max = '170141183460469231731687303715884105728';

})

describe('Ratio of big numbers function', function(){

  it('should be a function', function(){
    expect(getRatioOfToken).to.be.a('function');
  })

  it('should return ratio', function(){
    expect(getRatioOfToken('85070591730234615865843651857942052864'))
    .to.equal(2);

    expect(getRatioOfToken(big(2).pow(125)+''))
    .to.equal(4);

    expect(getRatioOfToken(big(2).pow(124)+''))
    .to.equal(8);

    expect(getRatioOfToken(big(2).pow(123)+''))
    .to.equal(16);

    var val = getRatioOfToken(big(2).pow(60)+'')
    console.log('val', val);
    expect(val).to.equal(147573952589676410000);

    var val = getRatioOfToken(big(2).pow(4)+'')
    console.log('val', val);
    // expect(val).to.equal(147573952589676410000);

  });
});
