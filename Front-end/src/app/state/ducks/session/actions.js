import * as types from "./types";

export const login = (username, password, rememberMe) => ( {
    type: types.LOGIN,
    meta: {
        async: true,
        blocking: true,
        path: "/authenticate",
        method: "POST",
        body: {username, password, rememberMe}
    }
} );

export const logout = ( ) => ( {
    type: types.LOGOUT
});

