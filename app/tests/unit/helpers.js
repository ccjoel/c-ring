var expect = require('chai').expect;
var big = require('big-number').n;
var getRatioOfToken = require('../../scripts/helpers/token-ratio');

describe('Ratio of big numbers function', function() {

  it('should be a function', function() {
    expect(getRatioOfToken).to.be.a('function');
  });

  it('should return ratio', function() {
    expect(getRatioOfToken('85070591730234615865843651857942052864'))
      .to.equal(2);
    expect(getRatioOfToken(big(2).pow(125) + ''))
      .to.equal(4);
    expect(getRatioOfToken(big(2).pow(124) + ''))
      .to.equal(8);
    expect(getRatioOfToken(big(2).pow(123) + ''))
      .to.equal(16);
    expect(getRatioOfToken(big(2).pow(60) + ''))
      .to.equal(147573952589676410000);
  });

  it('should throw Assertion Error if given wrong input', function() {
    try{
      getRatioOfToken('a');
    } catch(e) {
      expect(e.name).to.equal('AssertionError');
      expect(e.message).to.equal('token is not a string parseable to number');
    }

      expect(getRatioOfToken('')).to.equal(0);
      expect(getRatioOfToken('0')).to.equal(0);

      try{
        getRatioOfToken({});
      } catch(e) {
        expect(e.name).to.equal('AssertionError');
        expect(e.message).to.equal('token is not a string parseable to number');
      }

  });

  it('should return a big number based on a small input', function() {
    expect(getRatioOfToken('2')).to.be.at.least(457465746545);
  });

  it('should return a small nuimber based on a big input', function() {
    expect(getRatioOfToken('85070591730234615865843651857942052864')).to.be.below(3);
  });

});
