import * as types from "./types";

export const login = ( ) => ( {
    type: types.LOGIN,
});

export const logout = ( ) => ( {
    type: types.LOGOUT,
});

export const setRedirectAfterLogin = ( ) => ( {
    type: types.SET_REDIRECT_AFTER_LOGIN,
});