import { combineReducers } from "redux";
import * as types from "./types";
import { createReducer } from "../../utils";

const applyListReducer = createReducer( [] )( {
    [ types.GET_ALL_YEARS_COMPLETED ]: ( state, action ) => state = action.payload,
});

const applyDetailReducer = createReducer( {} )( {
    [ types.GET_YEARS_BY_ID_COMPLETED ]: ( state, action ) => action.payload,
});

const initialState = {progress: false, status: '',  data: {}}

const applyStatusActReducer = createReducer( initialState )( {
    [ types.ADD_NEW_YEARS ]: ( state, action ) => {
        state = {progress: true, status: 'ADDING', data: {}}
        return state;
    },
    [ types.ADD_NEW_YEARS_COMPLETED ]: ( state, action ) => {
        state = {progress: false, status: 'ADD_SUCCESS', data: {}}
        return state;
    },
    [ types.ADD_NEW_YEARS_FAILED ]: ( state, action ) => {
        state = {progress: false, status: 'ADD_FAILED', data: action.payload}
        return state;
    },
    [ types.UPDATE_YEARS ]: ( state, action ) => {
        state = {progress: true, status: 'UPDATING', data: {}}
        return state;
    },
    [ types.UPDATE_YEARS_COMPLETED ]: ( state, action ) => {
        state = {progress: false, status: 'UPDATE_SUCCESS', data: {}}
        return state;
    },
    [ types.UPDATE_YEARS_FAILED ]: ( state, action ) => {
        state = {progress: false, status: 'UPDATE_FAILED', data: action.payload}
        return state;
    },
    [ types.DELETE_YEARS ]: ( state, action ) => {
        return state;
    },
    [ types.DELETE_YEARS_COMPLETED ]: ( state, action ) => {
        state = {progress: false, status: 'DELETE_SUCCESS', data: action.payload}
        return state;
    },
    [ types.DELETE_YEARS_FAILED ]: ( state, action ) => {
        state = {progress: false, status: 'DELETE_FAILED', data: action.payload}
        return state;
    }
});


export default combineReducers( {
    list: applyListReducer,
    detail: applyDetailReducer,
    status: applyStatusActReducer
} );