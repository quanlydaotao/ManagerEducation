import { combineReducers } from "redux";
import * as types from "./types";
import * as utils from './utils';
import { createReducer } from "../../utils";


const tableReducer = createReducer( [] )( {
    [ types.SET_ROWS ]: ( state, action ) => {
        if (action.payload) {
            state = action.payload;
        }
        return state;
    }
});


export default combineReducers( {
    tableRows: tableReducer
} );