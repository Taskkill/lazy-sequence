const lazy = require("./main.es6.js");

let fib = lazy([0, 1], (n) => fib[n - 1] + fib[n - 2]);

console.log(0 in fib === true) // true
console.log(3 in fib === false) // false

console.log(fib[3] === 2); // 2

console.log(fib[9] === 34); // 34

console.log(fib[70] === 190392490709135); // 190392490709135

let even = lazy(n => 2 * n);

console.log(even[0] === 0); // 0
console.log(even[1] === 2); // 2
console.log(even[3] === 6); // 6

let ref = [0, 2];
ref[3] = 6;

let res = even.toArray().reduce(i => i);
ref = ref.reduce(i => i);
console.log(ref === res); // [0, 2, ,6]


// let lazy = lazy_seq([0, 1], function(n) {
//   return lazy[n - 1] + lazy[n - 2];
// });
// console.log('result   ' + lazy[4]);
// console.log(lazy.toArray());
//
// let smart = lazy_seq({
//   array: [0, 1],
//   length: 10
// }, (n) => smart[n - 1] + smart[n - 2]);
// console.log('smart ' + smart[4]);
//
// console.log(smart.toArray());
// console.log(smart.inRange(3));
// smart.fillAll();
//
// console.log(smart.toArray());
//
// try {
//   smart[3] = 23;
// } catch (ex) {
//   console.log(ex);
// }
//
// console.log(smart.toArray());
//
// console.log(smart.map(val => 2 * val));
//
// console.log();
//
// try {
//   //console.log(smart[-1]);
//   //console.log(smart['quark']);
//   console.log(smart[20]);
// } catch (ex) {
//   console.log(ex);
// }
//
// console.log(smart.toArray().length);
// console.log(smart.toArray());
