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

const getYearReducer = createReducer( {} )( {
    [ types.GET_YEARS_BY_ID ]: ( state, action ) => {
        state = {};
        return state;
    },
    [ types.GET_YEARS_BY_ID_COMPLETED ]: ( state, action ) => {
        if (action.payload) {
            state = action.payload
        }
        return state;
    },
    [ types.GET_YEARS_BY_ID_FAILED ]: ( state, action ) => {
        return state;
    },
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
    toggleEditYears: toggleEditYearsReducer,
    getYear: getYearReducer
} );