import { combineReducers } from "redux";
import * as types from "./types";
import { createReducer } from "../../utils";

const applyListReducer = createReducer( [] )( {
    [ types.GET_ALL_USER_ACCOUNT_COMPLETED ]: ( state, action ) => action.payload,
});

const applyDetailReducer  = createReducer( {} )( {
    [ types.GET_USER_ACCOUNT_BY_ID_COMPLETED ]: ( state, action ) => state = action.payload,
});

const initialState = {progress: false, status: '',  data: {}}

const applyStatusActReducer = createReducer( initialState )( {
    [ types.CREATE_NEW_USER_ACCOUNT ]: ( state, action ) => {
        state = {progress: true, status: 'ADDING', data: {}}
        return state;
    },
    [ types.CREATE_NEW_USER_ACCOUNT_COMPLETED ]: ( state, action ) => {
        state = {progress: false, status: 'ADD_SUCCESS', data: {}}
        return state;
    },
    [ types.CREATE_NEW_USER_ACCOUNT_FAILED ]: ( state, action ) => {
        state = {progress: false, status: 'ADD_FAILED', data: action.payload}
        return state;
    },
    [ types.UPDATE_USER_ACCOUNT ]: ( state, action ) => {
        state = {progress: true, status: 'UPDATING', data: {}}
        return state;
    },
    [ types.UPDATE_USER_ACCOUNT_COMPLETED ]: ( state, action ) => {
        state = {progress: false, status: 'UPDATE_SUCCESS', data: {}}
        return state;
    },
    [ types.UPDATE_USER_ACCOUNT_FAILED ]: ( state, action ) => {
        state = {progress: false, status: 'UPDATE_FAILED', data: action.payload}
        return state;
    },
    [ types.DELETE_USER_ACCOUNT ]: ( state, action ) => {
        return state;
    },
    [ types.DELETE_USER_ACCOUNT_COMPLETED ]: ( state, action ) => {
        state = {progress: false, status: 'DELETE_SUCCESS', data: action.payload}
        return state;
    },
    [ types.DELETE_USER_ACCOUNT_FAILED ]: ( state, action ) => {
        state = {progress: false, status: 'DELETE_FAILED', data: action.payload}
        return state;
    }
});

export default combineReducers( {
    list: applyListReducer,
    detail: applyDetailReducer,
    status: applyStatusActReducer,
} );