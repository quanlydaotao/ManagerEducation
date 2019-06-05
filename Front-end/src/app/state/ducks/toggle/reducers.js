import { combineReducers } from "redux";
import * as types from "./types";
import { createReducer } from "../../utils";

const toggleFormEditReducer = createReducer( false )( {
    [ types.OPEN_FORM_EDIT_ACCOUNT ]: ( state, action ) => {
        return true;
    },
    [ types.CLOSE_FORM_EDIT_ACCOUNT ]: ( state, action ) => {
        return false;
    },
    [ types.OPEN_FORM_EDIT_YEAR ]: ( state, action ) => {
        return true;
    },
    [ types.CLOSE_FORM_EDIT_YEAR ]: ( state, action ) => {
        return false;
    },
});

export default combineReducers( {
    toggleFormEdit: toggleFormEditReducer
});