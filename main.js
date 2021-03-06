'use strict';

module.exports = function (first, second) {
  var arr = void 0;
  var def = void 0;

  if (typeof first === 'function') {
    arr = [];
    def = first;
  } else {
    arr = Object.assign([], first.array || first);
    arr.length = first.length;
    def = second;
  }

  return new Proxy({
    at: function at(n) {
      return arr[n];
    },

    inRange: function inRange(n) {
      return n >= 0 && n < arr.length;
    },

    toArray: function toArray() {
      return Object.assign([], arr);
    },

    map: Array.prototype.map.bind(arr),

    forEach: Array.prototype.forEach.bind(arr),

    filter: Array.prototype.filter.bind(arr),

    fillAll: function fillAll() {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] === undefined) {
          arr[i] = def(i);
        }
      }
    },

    typeOf: function typeOf() {
      return 'LazySequence';
    }

  }, {
    has: function has(target, prop) {
      return prop in target || prop in arr;
    },

    get: function get(target, prop) {
      if (prop === 'length') {
        return arr.length;
      }
      if (prop in target) {
        return target[prop];
      }

      var n = Number(prop);
      var validIndex = Number.isFinite(n) && n >= 0;

      if (!validIndex) {
        throw 'unexpected property ' + prop;
      }

      if (arr[n] === undefined) {
        arr[n] = def(n);
      }
      return arr[n];
    },
    set: function set(target, prop, value) {
      if (prop === 'length') {
        return arr.length = value;
      }

      throw 'lazy-sequence error - malicious assignment into forbiden lazy property';
    },

    deleteProperty: function deleteProperty(target, prop) {
      var n = Number(prop);
      var validIndex = Number.isFinite(n) && n >= 0;

      if (!validIndex) {
        throw 'lazy-sequence error - illegal delete of property ' + prop;
      }

      arr[n] = undefined;
    }
  });
};
