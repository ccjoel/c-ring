var expect = require('chai').expect;
var setupRing = require('../../scripts/draw-svg/setup-ring');
var drawNode = require('../../scripts/draw-svg/draw-node');
var drawAllNodes = require('../../scripts/draw-svg/draw-all-nodes');


describe('Setting up graph ring : setupRing', function() {

  var nodelist = [];
  var containerElement = {
    id: 'ring-container',
    width: 540,
    height: 540
  };

  it('throws error given wrong first input', function() {
    try {
      setupRing("hello");
    } catch (e) {
      expect(e.message).to.equal('invalid container element width');
    }
  });

  it('throws error given wrong second input', function() {
    try {
      setupRing(50, "no wayyy");
    } catch (e) {
      expect(e.message).to.equal('invalid container element height');
    }
  });



});

describe('Draw one graph node', function() {

  it('should throw error when passing non-object or empty configuration', function() {
    try {
      drawNode('3876455', {});
    } catch (e) {
      expect(e.message).to.equal('invalid configuration provided in draw-node');
    }
  });

  it('should throw an error when node value contains weird token (non string that translate into numbers)',
    function() {
      try {
        drawNode({}, {
          svg: 'svg',
          radius: 'c'
        });
      } catch (e) {
        expect(e.message).to.equal('invalid nodeToken provided in draw-node');
      }

      try {
        drawNode('a', {
          svg: 'svg',
          radius: 'c'
        });
      } catch (e) {
        expect(e.message).to.equal('nodeToken provided is not a number in draw-node');
      }

      try {
        drawNode({
          svg: 'svg',
          radius: 'c'
        });
      } catch (e) {
        expect(e.message).to.equal('invalid nodeToken provided in draw-node');
      }

    });

});
