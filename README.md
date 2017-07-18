# lazy-sequence
Lazy sequences in JavaScript.

It's still in development.

Main purpose is to create lazy sequences acting like arrays.

You can use it in node or in browser using some browser module manager like webpack or browserify.

```bash
npm install lazy-sequence
```

Example of usage:

## Recursive sequences
```javascript
  import lazy from 'lazy-sequence';

  let fib = lazy([0, 1], (n) => fib[n - 1] + fib[n - 2]);

  0 in fib // true
  3 in fib // false

  fib[3]; // 2

  3 in fib // true

  5 in fib // false

  fib[9]; // 34

  5 in fib // true
```

## Simplest usage
```javascript
  import lazy from 'lazy-sequence';

  let even = lazy(n => 2 * n);

  even[0] // 0
  even[1] // 2
  even[3] // 6
  // ....
```

## You can set length limit
```javascript
  import lazy from 'lazy-sequence';

  let limited = lazy({array: [0, 1], length: 50}, (n) => limited[n - 1] + limited[n - 2]);

  limited.length; // 50

  limited[9] // 34

  49 in limited // false

  // you can test if index is in range of length

  limited.inRange(49) // true

  limited.inRange(70) // false

  limited.fillAll();

  49 in limited // true

  // you can exceed the limit - it will behave like simple array

  limited[70] // 190392490709135
```

## You can convert it into real array
```javascript
  import lazy from 'lazy-sequence';

  let even = lazy(n => 2 * n);

  even[0] // 0
  even[1] // 2
  even[3] // 6

  even.toArray(); // [0, 2, ,6]
```

# It relies on Proxy - make sure Proxy is a present - native or some standard pollyfill!
But also it's transpiled with babel for backward compatibility.

## DOCs will come soon.
