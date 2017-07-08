module.exports = (first, second) => {
  let arr;
  let def;

  if (typeof first === 'function') {
    arr = [];
    def = first;
  } else {
    arr = Object.assign([], first.array || first);
    arr.length = first.length;
    def = second;
  }

  return new Proxy({
    at: (n) => arr[n],

    inRange: (n) => n >= 0 && n < arr.length,

    toArray: () => Object.assign([], arr),

    map: Array.prototype.map.bind(arr),

    forEach: Array.prototype.forEach.bind(arr),

    filter: Array.prototype.filter.bind(arr),

    fillAll: () => {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] === undefined) {
          arr[i] = def(i);
        }
      }
    },

    typeOf: () => 'LazySequence',

  }, {
    has: (target, prop) => (prop in target || prop in arr),

    get: (target, prop) => {
      if (prop === 'length') {
        return arr.length;
      }
      if (prop in target) {
        return target[prop];
      }

      let n = Number(prop);
      let validIndex = Number.isFinite(n) && n >= 0;

      if (!validIndex) {
        throw 'unexpected property ' + prop;
      }

      if (arr[n] === undefined) {
        arr[n] = def(n);
      }
      return arr[n];
    },
    set: (target, prop, value) => {
      if (prop === 'length') {
        return arr.length = value;
      }

      throw 'lazy-sequence error - malicious assignment into forbiden lazy property';
    },

    deleteProperty: (target, prop) => {
      let n = Number(prop);
      let validIndex = Number.isFinite(n) && n >= 0;

      if (!validIndex) {
        throw 'lazy-sequence error - illegal delete of property ' + prop;
      }

      arr[n] = undefined;
    },
  })
}
