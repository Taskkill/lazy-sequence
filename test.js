"use strict";

var lazy = require("./main.es6.js");

var fib = lazy([0, 1], function (n) {
  return fib[n - 1] + fib[n - 2];
});

console.log(0 in fib === true // true
);console.log(3 in fib === false // false

);console.log(fib[3]); // 2

console.log(fib[9]); // 34

console.log(fib[70]); // 190392490709135

var even = lazy(function (n) {
  return 2 * n;
});

even[0]; // 0
even[1]; // 2
even[3]; // 6

console.log(even.toArray()); // [0, 2, ,6]
