document.addEventListener('DOMContentLoaded', function() {

	const Lua = require('./Lua').Lua;

	const lua = new Lua;


	lua.addEventListener('ready', (event) => {
	
		console.log('Lua ready!');

		lua.run('for i=1,10 do print(i) end');
	
	});

	lua.addEventListener('output', (event) => {
	
		console.log(event.detail.join("\n"));
		// outputArea.write(event.detail.join("\n"));
	
	});


	// console.log(LuaBin, 123);

	// const lua = new LuaBin({

	// 	postRun: () => {

	// 		console.log('Module ready!');

	// 		lua.ccall(
	// 			'lua_init'
	// 			, 'number'
	// 			, []
	// 			, []
	// 		);

	// 		lua.ccall(
	// 			'lua_run'
	// 			, 'number'
	// 			, ['string']
	// 			, ['for i=1,10 do print(i) end']
	// 		);

	// 		lua.ccall(
	// 			'lua_run'
	// 			, 'number'
	// 			, ['string']
	// 			, ['x=10']
	// 		);

	// 		lua.ccall(
	// 			'lua_run'
	// 			, 'number'
	// 			, ['string']
	// 			, ['print("" .. x .. "\\n")']
	// 		);
		
	// 	}

	// 	, 'print': (text) => {
		
	// 		console.log('Out:' + text);

	// 	}
		
	// 	, 'printErr': function(text) {

	// 		console.error('Err: ' + text);

	// 	}

	// 	, wasmMemory: new WebAssembly.Memory({
	// 		initial:  128
	// 	})

	// });


});
