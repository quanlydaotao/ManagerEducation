import { combineReducers } from "redux";
import * as types from "./types";
import { createReducer } from "../../utils";

const initialState = { name: '', year: 0, course: 0 };

const selectionReducer = createReducer( initialState )( {
    [ types.SET_DATA_SELECT ]: ( state, action ) => action.payload
});

export default combineReducers( {
    select: selectionReducer,
} );