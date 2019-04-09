import * as types from './types';

const initialState = false;

const searchHeaderReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.OPEN_SEARCH_HEADER:
            return true;
        case types.CLOSE_SEARCH_HEADER:
            return false;
        default: return state;
    }
}

export default searchHeaderReducer;