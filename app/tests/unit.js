
var expect = require('chai').expect;
var graph = require('../scripts/graph');
var setupGraph = graph.setupRing;
var drawGraph = graph.drawNode;
var getRatioOfToken = graph.getRatioOfToken;



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

  var BigNumber = require('big-number').n;

  it('should convert a big number from input string', function(){
    console.log(10, BigNumber(10)+'');
    console.log(16, BigNumber(2).pow(4)+'');

    console.log(
      '85070591730234615865843651857942052864',
    BigNumber('85070591730234615865843651857942052864')+''
  );

    console.log(
      '170141183460469231731687303715884105728',
      BigNumber('170141183460469231731687303715884105728')+''
    );
  });

  it('should return inverse ratio', function(){
    console.log(BigNumber('170141183460469231731687303715884105728').divide('85070591730234615865843651857942052864')+'');
  });

  it('should be able to provide ratio', function(){
    console.log(
      BigNumber('85070591730234615865843651857942052864').divide('170141183460469231731687303715884105728').rest

      +'');



  });

})

describe('Ratio of big numbers function', function(){

  it('should be a function', function(){
    expect(getRatioOfToken).to.be.a('function');
  })

  it('should return ratio', function(){
    // getRatioOfToken('85070591730234615865843651857942052864').to.equal()
  });
});
