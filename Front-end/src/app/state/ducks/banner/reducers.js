import * as types from './types';

const initialState = [];

const bannerReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_LIST_BANNER_COMPLETED:
            state = action.payload;
            return state;
        default: return state;
    }
}

export default bannerReducer;