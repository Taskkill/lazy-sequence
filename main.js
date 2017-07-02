
  lazy_seq = function(src, def) {
		if (src === undefined || def === undefined) {
			throw 'illegal count of arguments - expected 2';
		}
		
		if (!src instanceof Array && !src.arr instanceof Array) {
			throw 'illegal argument one of lazy_seq';
		}
		
		if (typeof def !== 'function') {
			throw 'illegal argument two of lazy_seq';
		}
		
		// set correct input
		let arr = Object.assign([], src instanceof Array ? src : src.arr);
		if (src.len !== undefined) {
			arr.length = src.len;
	   }
		
		let sequence = new Proxy(
		  {
			  at: (n) =>
				  arr[n]
				,
			  map: (def, scope) =>
				  arr.map(def, scope)
		    ,
			  forEach: (def, scope) =>
				  arr.forEach(def, scope)
			  ,
			  toArray: () =>
				  Object.assign([], arr)
			  ,
			  filter: (condition, scope) =>
				  arr.filter(condition, scope)
		   	,
			  fillAll: () => {
				  for (let i = 0; i < arr.length; i++) {
					  sequence[i];
					}
				},
			  inRange: (n) =>
			    n >= 0 && n < arr.length
			  ,
			  typeOf: () =>
				  'LazySequence'
				,
	   	},
		  {
			  has: (target, prop, reciever) => {
				  if (prop in target) {
					  return true;
					}
					
				  return arr[prop] !== undefined;
			  },
			  get: (target, prop, reciever) => {
				  if (prop in target) {
					  return target[prop];
					}
					
					let n = Number.parseInt(prop);
					
					let validIndex = Number.isFinite(n) &&
					    n >= 0;
					
					if (!validIndex) {
						throw 'unexpected property ' + prop;
					}
					
				  if (arr[n] === undefined) {
						  arr[n] = def(n);
					}
					return arr[n];
			   },
			  set: (target, prop, value, reciever) => {
				  throw 'malicious assignment into forbiden lazy property';
			  }
		  });
		return sequence;
	};
