document.addEventListener('DOMContentLoaded', function() {

	const input  = document.querySelector('.input  textarea');
	const output = document.querySelector('.output > * > *');
	const run    = document.querySelector('[data-run]');
	const status = document.querySelector('[data-status]');

	status.innerText = 'Loading...';

	const editor = ace.edit(input);
	editor.session.setMode("ace/mode/lua");

	const Lua = require('./Lua').Lua;
	const lua = new Lua;

	lua.addEventListener('ready', (event) => {
		status.innerText = 'Lua loaded & ready!';
		run.addEventListener('click', () => {

			status.innerText = 'Executing...';

			while(output.firstChild)
			{
				output.firstChild.remove();
			}
			lua.run(editor.session.getValue());
		});
	});

	lua.addEventListener('output', (event) => {

		setTimeout(()=>status.innerText = 'Lua loaded & ready!', 50);

		const row = document.createElement('div');

		row.innerText = event.detail.join("\n");
		row.setAttribute('tabindex', -1);
		
		row.classList.add('row');

		output.append(row);
	});

});
