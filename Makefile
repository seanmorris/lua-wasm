.PHONY: build clean

build: lua/makefile index.js lua-web.wasm

Lua.js: source/Lua.js Makefile
	npm run build

lua/makefile:
	git clone --single-branch --branch v5.4.0 https://github.com/lua/lua.git lua
	cd lua && git apply ../lua.diff

lua-web.wasm: source/lua.c Makefile
	cp source/lua.c lua/lua.c
	cd lua && make CC="em++ -s WASM=1 -s ENVIRONMENT=web -s MODULARIZE=1 -s EXPORT_NAME=\"'Lua'\"" AR="emar rcu" RANLIB="emranlib"
	cp build/lua-web-bin.wasm docs/
	cp build/lua-web-bin.* .

clean:
	rm -rf lua lua-web-bin.wasm lua-web-bin.js rm docs/app.js docs/app.js.map docs/lua-web-bin.wasm build/lua-web-bin.wasm build/lua-web-bin.js