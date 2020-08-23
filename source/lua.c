#include <emscripten.h>
#include <stdlib.h>
#include <stdio.h>

#include "lua.h"
#include "lauxlib.h"
#include "lualib.h"

lua_State *L = luaL_newstate();

extern "C" {

int lua_init()
{
	
	int result = 0;

	if (L == NULL)
	{
		result = 1;
		
		printf("lua: cannot create state: not enough memory\n");

	}
	
	luaL_openlibs(L);

	return result ? EXIT_SUCCESS : EXIT_FAILURE;
}

int lua_run(const char *script)
{
	int result = 0;
	int status = luaL_dostring(L, script);
	
	if (status != LUA_OK)
	{
		const char *msg = lua_tostring(L, -1);
		printf("err: %s\n", msg);
		printf("lua: %s\n", script);
		lua_close(L);
		return EXIT_FAILURE;
	}
	
	result = lua_toboolean(L, -1);

	return result;
}

void lua_destroy()
{
	lua_close(L);
}

int lua_refresh()
{
	lua_destroy();

	int result = lua_init();

	return result ? EXIT_SUCCESS : EXIT_FAILURE;
}

}
