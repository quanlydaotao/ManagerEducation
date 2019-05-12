import { combineReducers } from "redux";
import * as types from "./types";
import * as utils from './utils';
import { createReducer } from "../../utils";

const fileReducer = createReducer( {} )( {
    [ types.UPLOAD_FILE ]: ( state, action ) => {
        return state;
    },
    [ types.UPLOAD_FILE_COMPLETED ]: ( state, action ) => {
        console.log('upload completed!');
        return state;
    },
    [ types.UPLOAD_FILE_FAILED ]: ( state, action ) => {
        console.log('upload failed!');
        return state;
    },
    [ types.GET_FILE ]: ( state, action ) => {
        return state;
    },
    [ types.GET_FILE_COMPLETED ]: ( state, action ) => {
        console.log('get completed!');
        state = action.payload;
        return state;
    },
    [ types.GET_FILE_FAILED ]: ( state, action ) => {
        console.log('get failed!');
        return state;
    },
});

export default combineReducers( {
    files: fileReducer
} );