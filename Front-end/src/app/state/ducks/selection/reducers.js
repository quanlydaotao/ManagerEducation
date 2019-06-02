import { combineReducers } from "redux";
import * as types from "./types";
import { createReducer } from "../../utils";

const initialState = {year: 0, course: 0}

const selectionReducer = createReducer( initialState )( {
    [ types.SET_DATA_SELECT_YEAR ]: ( state, action ) => {
        if (action.payload) {
            state = { year: action.payload, course: 0 }
        }
        return state;
    },
    [ types.SET_DATA_SELECT_COURSE ]: ( state, action ) => {
        if (action.payload) {
            state = { year: state.year, course: action.payload };
        }
        return state;
    }
});

export default combineReducers( {
    select: selectionReducer,
} );