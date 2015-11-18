// http://stackoverflow.com/questions/1382107/whats-a-good-way-to-extend-error-in-javascript

function AssertionError(message) {
  this.constructor.prototype.__proto__ = Error.prototype;
  this.name = this.constructor.name;
  this.message = message;
}

exports.assert = function(test, message) {
  if (!test) {
    throw new AssertionError(message);
  }
}


// Thought of using these
/*
// From Javascript: The Good Parts
Function.prototype.method = function(name, func) {
  if (!this.prototype[name]) {
    this.prototype[name] = func;
    return this;
  }
};

// From Javascript: The Good Parts
if (typeof Object.create !== 'function') {
  Object.create = function(o) {
    var F = function() {};
    F.prototype = o;
    return new F();
  };
}
*/

/*
 * es6 transpiled Error inheritance. Messy in es5:

'use strict';

var _get = function get(_x, _x2, _x3) {
  var _again = true;
  _function: while (_again) {
    var object = _x,
      property = _x2,
      receiver = _x3;
    _again = false;
    if (object === null) object = Function.prototype;
    var desc = Object.getOwnPropertyDescriptor(object, property);
    if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);
      if (parent === null) {
        return undefined;
      } else {
        _x = parent;
        _x2 = property;
        _x3 = receiver;
        _again = true;
        desc = parent = undefined;
        continue _function;
      }
    } else if ('value' in desc) {
      return desc.value;
    } else {
      var getter = desc.get;
      if (getter === undefined) {
        return undefined;
      }
      return getter.call(receiver);
    }
  }
};

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var AssertionError = (function(_Error) {
  _inherits(AssertionError, _Error);

  function AssertionError(message) {
    _classCallCheck(this, AssertionError);

    _get(Object.getPrototypeOf(AssertionError.prototype), 'constructor', this).call(this, message);
    this.message = message;
    this.name = 'AssertionError';
  }

  return AssertionError;
})(Error);
*/
