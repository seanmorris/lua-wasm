const LuaBinary = require('build/lua-web-bin');

export class Lua extends EventTarget
{
	constructor()
	{
		super();

		const FLAGS = {};

		this.returnValue = -1;

		this.onerror  = function () {};
		this.onoutput = function () {};
		this.onready  = function () {};

		this.binary = new LuaBinary({

			postRun:  () => {
				const event = new CustomEvent('ready');
				this.dispatchEvent(event);
				this.onready(event)
			},

			print: (...chunks) =>{
				const event = new CustomEvent('output', {detail: chunks.map(c=>c+"\n")});
				this.dispatchEvent(event);
				this.onoutput(event);
			},

			printErr: (...chunks) => {
				const event = new CustomEvent('error', {detail: chunks.map(c=>c+"\n")});
				this.onerror(event);
				this.dispatchEvent(event);
			}
		});

		this.binary.then(bin => {

			const retVal = bin.ccall(
				'lua_init'
				, 'number'
				, ["string"]
				, []
			);

			return bin;

		});
	}

	run(code)
	{
		return this.binary.then(bin => {

			const retVal = bin.ccall(
				'lua_run'
				, 'number'
				, ["string"]
				, [code]
			);

			return retVal;

		});
	}

	refresh()
	{
		return this.binary.then(php => {

			return php.ccall(
				'lua_refresh'
				, 'number'
				, []
				, []
			);

		});
	}
}

if(window && document)
{
	const lua = new Lua;

	const runScriptTag = element => {

		const src = element.getAttribute('src');

		if(src)
		{
			fetch(src).then(r => r.text()).then(r => {

				lua.run(r).then(exit=>console.log(exit));

			});

			return;
		}

		const inlineCode = element.innerText.trim();

		if(inlineCode)
		{
			lua.run(inlineCode);
		}

	};

	lua.addEventListener('ready', () => {
		const phpSelector = 'script[type="text/lua"]';

		const htmlNode = document.body.parentElement;
		const observer = new MutationObserver((mutations, observer)=>{
			for(const mutation of mutations)
			{
				for(const addedNode of mutation.addedNodes)
				{
					if(!addedNode.matches || !addedNode.matches(phpSelector))
					{
						continue;
					}

					runScriptTag(addedNode);
				}

			}
		});

		observer.observe(htmlNode, {childList: true, subtree: true});

		const phpNodes = document.querySelectorAll(phpSelector);

		for(const phpNode of phpNodes)
		{
			const code = phpNode.innerText.trim();

			runScriptTag(phpNode);
		}
	});

}
