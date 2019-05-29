import { combineReducers } from "redux";
import * as types from "./types";
import { createReducer } from "../../utils";

const allYearsReducer = createReducer( [] )( {
    [ types.GET_ALL_YEARS_COMPLETED ]: ( state, action ) => {
        if (action.payload) {
            state = action.payload;
        }
        return state;
    }
});

const initialState = {progress: false, status: '',  data: {}}

const actionReducer = createReducer( initialState )( {
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
    // [ types.UPDATE_USER_ACCOUNT ]: ( state, action ) => {
    //     state = {progress: true, status: 'UPDATING', data: {}}
    //     return state;
    // },
    // [ types.UPDATE_USER_ACCOUNT_COMPLETED ]: ( state, action ) => {
    //     state = {progress: false, status: 'UPDATE_SUCCESS', data: {}}
    //     return state;
    // },
    // [ types.UPDATE_USER_ACCOUNT_FAILED ]: ( state, action ) => {
    //     state = {progress: false, status: 'UPDATE_FAILED', data: action.payload}
    //     return state;
    // },
    // [ types.DELETE_USER_ACCOUNT ]: ( state, action ) => {
    //     return state;
    // },
    // [ types.DELETE_USER_ACCOUNT_COMPLETED ]: ( state, action ) => {
    //     state = {progress: false, status: 'DELETE_SUCCESS', data: {}}
    //     return state;
    // },
    // [ types.DELETE_USER_ACCOUNT_FAILED ]: ( state, action ) => {
    //     state = {progress: false, status: 'DELETE_FAILED', data: action.payload}
    //     return state;
    // }
});

const toggleEditYearsReducer = createReducer( false )( {
    [ types.OPEN_EDIT_YEARS ]: ( state, action ) => {
        state = true;
        return state;
    },
    [ types.CLOSE_EDIT_YEARS ]: ( state, action ) => {
        state = false;
        return state;
    }
});


export default combineReducers( {
    allYears: allYearsReducer,
    actionsYears: actionReducer,
    toggleEditYears: toggleEditYearsReducer
} );