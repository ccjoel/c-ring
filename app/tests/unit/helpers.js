var expect = require('chai').expect;
var big = require('big-number').n;
var getRatioOfToken = require('../../scripts/helpers/token-ratio');
var arrayFromTokens = require('../../scripts/helpers/array-from-tokens');

describe('Ratio of big numbers function', function() {

  it('should be a function', function() {
    expect(getRatioOfToken).to.be.a('function');
  });

  it('should return ratio', function() {
    expect(getRatioOfToken('85070591730234615865843651857942052864'))
      .to.be.above(2);
    expect(getRatioOfToken(big(2).pow(125) + ''))
      .to.be.above(4);
    expect(getRatioOfToken(big(2).pow(124) + ''))
      .to.be.above(8);
    expect(getRatioOfToken(big(2).pow(123) + ''))
      .to.be.above(16);
    expect(getRatioOfToken(big(2).pow(60) + ''))
      .to.equal(0.0);
  });

  it('should throw Assertion Error if given wrong input', function() {
    try{
      getRatioOfToken('a');
    } catch(e) {
      expect(e.name).to.equal('AssertionError');
      expect(e.message).to.equal('token is not a string parseable to number, in token-ratio');
    }

      expect(getRatioOfToken('')).to.equal(0);
      expect(getRatioOfToken('0')).to.equal(0);

      try{
        getRatioOfToken({});
      } catch(e) {
        expect(e.name).to.equal('AssertionError');
        expect(e.message).to.equal('token is not a string parseable to number, in token-ratio');
      }

  });

  it('should return 0 based on a small input', function() {
    expect(getRatioOfToken('2')).to.be.at.least(0);
  });

  it('should return a small number based on a big input', function() {
    expect(getRatioOfToken('85070591730234615865843651857942052864')).to.be.below(2.1);
  });

});

describe('array from tokens', function(){
  it('should return an array with only numbers as string, no commas or whitespace', function(){
    expect(arrayFromTokens('"0", "3545","↵454554545"')).to.have.length(3);
  });
})
