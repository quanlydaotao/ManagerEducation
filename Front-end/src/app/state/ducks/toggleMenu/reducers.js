import * as types from './types';

const initialState = true;

const toggleMenuReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.OPEN_MENU:
            return true;
        case types.CLOSE_MENU:
            return false;
        default: return state;
    }
}

export default toggleMenuReducer;