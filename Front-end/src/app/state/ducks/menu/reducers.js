import * as types from './types';

const initialState = [];

const menuReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_LIST_MENU_COMPLETED:
            state = action.payload;
            return state;
        default: return state;
    }
}

export default menuReducer;