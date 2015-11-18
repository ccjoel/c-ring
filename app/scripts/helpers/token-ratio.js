
// ------------------------------ imports --------------------------------------

var BigNumber = require('big-number').n; // to work with BIG numbers in javascript :)
// Supported BigNumber methods: add/plus, minus/subtract,
// multiply/mult, divide/div, power/pow, mod,
// equals, lt, lte, gt, gte, isZero, abs
// Sample : var big = BigNumber(5).plus(97).minus(53).plus(434).multiply(5435423).add(321453).multiply(21).div(2).pow(2);
// Sample out: 760056543044267246001 // when converting to string

var assert = require('../assert').assert;

// ------------------------------ globals -------------------------------------

// var MAX_JS = BigNumber(2).pow(53).minus(1);
var MAX_DIFF = BigNumber(2).pow(74).plus(1);
var MAX_TOKEN = BigNumber(2).pow(127).divide(MAX_DIFF); // 2^127 is biggest token value
var BIGGEST_NUMBER = BigNumber(2).pow(127);
// 2^127 = 170141183460469231731687303715884105728
// 2^ 126 = 85070591730234615865843651857942052864


/**
 * The maximum token id allowed is 2^127. There's one computer science challenge:
 * javascript's max number is 2^53-1
 *
 * From ECMA Section 8.5 - Numbers:
 * > Note that all the positive and negative integers whose magnitude is no
 * > greater than 2^53 are representable in the Number type...
 *
 * ES6 defines it as Number.MAX_SAFE_INTEGER.
 *
 * @param {!String} token a token to calculate ratio of, compared to the MAX_TOKEN value
 * @returns {Number} ratio of token, as js number
 *
 *
 * @author Joel Quiles
 * @since 2015-Nov-16
 */
module.exports = function (token) {
  assert(typeof token === 'string' && !isNaN(token), 'token is not a string parseable to number, in token-ratio');

  if(token === '0' || token === '') {                     // I WILL NOT DIVIDE BY 0
    return 0;
  }

  if(BigNumber(token).gt(BIGGEST_NUMBER+'')) {
    console.warn('You have passed a higher value than 2^127. This is  not supported. Returning MAX position.');
    return 1.0;
  }

  // if less than 2^100, your eye wont see the difference in the ring
  if(Math.log2(BigNumber(token)) < 100) {
    return 0.0;
  }

  // scale token by same ratio as MAX_TOKEN
  // We convert BigNumber to its string representation (e.g. '4343434343434') by adding ''
  var tokenScaled = BigNumber(token).divide(MAX_DIFF+'')+'';
  // convert to float both 2^127 and received token
  var tokenScaledFloat = parseFloat(tokenScaled, 10);
  var maxScaledFloat = parseFloat(BigNumber(MAX_TOKEN+''),10);

  // return the ratio of MAX:token
  return maxScaledFloat / tokenScaledFloat;
}
