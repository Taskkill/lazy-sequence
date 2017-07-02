
	let lazy = lazy_seq([0, 1],  function (n) { return lazy[n - 1] + lazy[n - 2]; });
	alert('result   ' +lazy[4]);
	alert(lazy.toArray());
	
	let smart = lazy_seq({arr: [0, 1], len: 10}, (n) => smart[n - 1] + smart[n - 2]);
  alert('smart ' + smart[4]);
  
  alert(smart.toArray());
  alert(smart.inRange(3));
  smart.fillAll();

  alert(smart.toArray());

  try {
	  smart[3] = 23;
	 } catch (ex) {
		  alert(ex);
		}
		
		alert(smart.toArray());
		
		alert(smart.map(val => 2 * val));
		
		alert();
		
		try {
	    //alert(smart[-1]);
		  //alert(smart['quark']);
		  alert(smart[20]);
		} catch (ex) {
			alert(ex);
		}
		
		alert(smart.toArray().length);
		alert(smart.toArray());
