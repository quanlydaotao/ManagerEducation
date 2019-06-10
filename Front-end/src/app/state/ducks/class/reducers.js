import { combineReducers } from "redux";
import * as types from "./types";
import { createReducer } from "../../utils";
import { history } from '../../utils';

const applyListReducer = createReducer( [] )( {
    [ types.GET_ALL_CLASS_BY_ID_COURSE_COMPLETED ]: ( state, action ) => action.payload,
});

const applyDetailReducer = createReducer( {} )( {
    [ types.GET_CLASS_BY_ID_COMPLETED ]: ( state, action ) => action.payload,
});

const initialState = {progress: false, status: '',  data: {}}

const applyStatusActReducer = createReducer( initialState )( {
    [ types.ADD_NEW_CLASS ]: ( state, action ) => {
        state = {progress: true, status: 'ADDING', data: {}}
        return state;
    },
    [ types.ADD_NEW_CLASS_COMPLETED ]: ( state, action ) => {
        state = {progress: false, status: 'ADD_SUCCESS', data: {}}
        history.push('/admin/edu/classes');
        return state;
    },
    [ types.ADD_NEW_CLASS_FAILED ]: ( state, action ) => {
        state = {progress: false, status: 'ADD_FAILED', data: action.payload}
        return state;
    },
    // [ types.UPDATE_YEARS ]: ( state, action ) => {
    //     state = {progress: true, status: 'UPDATING', data: {}}
    //     return state;
    // },
    // [ types.UPDATE_YEARS_COMPLETED ]: ( state, action ) => {
    //     state = {progress: false, status: 'UPDATE_SUCCESS', data: {}}
    //     return state;
    // },
    // [ types.UPDATE_YEARS_FAILED ]: ( state, action ) => {
    //     state = {progress: false, status: 'UPDATE_FAILED', data: action.payload}
    //     return state;
    // },
    // [ types.DELETE_YEARS ]: ( state, action ) => {
    //     return state;
    // },
    // [ types.DELETE_YEARS_COMPLETED ]: ( state, action ) => {
    //     state = {progress: false, status: 'DELETE_SUCCESS', data: action.payload}
    //     return state;
    // },
    // [ types.DELETE_YEARS_FAILED ]: ( state, action ) => {
    //     state = {progress: false, status: 'DELETE_FAILED', data: action.payload}
    //     return state;
    // }
});



export default combineReducers( {
    list: applyListReducer,
    detail: applyDetailReducer,
    status: applyStatusActReducer,
});