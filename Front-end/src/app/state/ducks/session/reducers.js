import * as types from './types';

const initialState1 = false;
const initialState2 = "";

const sessionReducer = (state = initialState1, action) => {
    switch (action.type) {
        case types.LOGIN:
            return true;
        case types.LOGOUT:
            return false;
        case types.SET_REDIRECT_AFTER_LOGIN:
            return action.payload.redirectUrl;
        default: return state;
    }
}

const redirectAfterLoginReducer = (state = initialState2, action) => {
    switch (action.type) {
        case types.SET_REDIRECT_AFTER_LOGIN:
            return action.payload.redirectUrl;
        default: return state;
    }
}
export {
    sessionReducer,
    redirectAfterLoginReducer
};