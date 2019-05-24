import { combineReducers } from "redux";
import * as types from "./types";
import { createReducer } from "../../utils";

const popupDeleteReducer = createReducer( false )( {
    [ types.OPEN_POPUP_DELETE ]: ( state, action ) => {
        state = true;
        return state;
    },
    [ types.CLOSE_POPUP_DELETE ]: ( state, action ) => {
        state = false;
        return state;
    },
});

export default combineReducers( {
    popupDelete: popupDeleteReducer
});