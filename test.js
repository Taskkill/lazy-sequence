const lazy_seq = require("./main.js");

let lazy = lazy_seq([0, 1], function(n) {
  return lazy[n - 1] + lazy[n - 2];
});
console.log('result   ' + lazy[4]);
console.log(lazy.toArray());

let smart = lazy_seq({
  array: [0, 1],
  length: 10
}, (n) => smart[n - 1] + smart[n - 2]);
console.log('smart ' + smart[4]);

console.log(smart.toArray());
console.log(smart.inRange(3));
smart.fillAll();

console.log(smart.toArray());

try {
  smart[3] = 23;
} catch (ex) {
  console.log(ex);
}

console.log(smart.toArray());

console.log(smart.map(val => 2 * val));

console.log();

try {
  //console.log(smart[-1]);
  //console.log(smart['quark']);
  console.log(smart[20]);
} catch (ex) {
  console.log(ex);
}

console.log(smart.toArray().length);
console.log(smart.toArray());
