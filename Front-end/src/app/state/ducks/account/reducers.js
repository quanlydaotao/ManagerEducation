import { combineReducers } from "redux";
import * as types from "./types";
import * as utils from './utils';
import { createReducer } from "../../utils";

const accountReducer = createReducer( [] )( {
    [ types.GET_ALL_USER_ACCOUNT_COMPLETED ]: ( state, action ) => {
        if (action.payload) {
            state = action.payload;
        }
        return state;
    },
    [ types.ADD_NEW_USER_ACCOUNT ]: ( state, action ) => {
        return state;
    },
    [ types.UPDATE_USER_ACCOUNT ]: ( state, action ) => {
        return state;
    },
    [ types.DELETE_USER_ACCOUNT ]: ( state, action ) => {
        return state;
    }
} );

export default combineReducers( {
    accounts: accountReducer
} );