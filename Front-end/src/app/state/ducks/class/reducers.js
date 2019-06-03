import { combineReducers } from "redux";
import * as types from "./types";
import { createReducer } from "../../utils";

const allClassesReducer = createReducer( [] )( {
    [ types.GET_ALL_CLASS_BY_ID_COURSE_COMPLETED ]: ( state, action ) => {
        if (action.payload) {
            state = action.payload;
        }
        return state;
    }
});

const getClassReducer = createReducer( {} )( {
    [ types.GET_CLASS_BY_ID ]: ( state, action ) => {
        return state;
    },
    [ types.GET_CLASS_BY_ID_COMPLETED ]: ( state, action ) => {
        if (action.payload) {
            state = action.payload
        }
        return state;
    },
    [ types.GET_CLASS_BY_ID_FAILED ]: ( state, action ) => {
        return state;
    },
});

// const initialState = {progress: false, status: '',  data: {}}

// const actionReducer = createReducer( initialState )( {
//     [ types.ADD_NEW_YEARS ]: ( state, action ) => {
//         state = {progress: true, status: 'ADDING', data: {}}
//         return state;
//     },
//     [ types.ADD_NEW_YEARS_COMPLETED ]: ( state, action ) => {
//         state = {progress: false, status: 'ADD_SUCCESS', data: {}}
//         return state;
//     },
//     [ types.ADD_NEW_YEARS_FAILED ]: ( state, action ) => {
//         state = {progress: false, status: 'ADD_FAILED', data: action.payload}
//         return state;
//     },
//     [ types.UPDATE_YEARS ]: ( state, action ) => {
//         state = {progress: true, status: 'UPDATING', data: {}}
//         return state;
//     },
//     [ types.UPDATE_YEARS_COMPLETED ]: ( state, action ) => {
//         state = {progress: false, status: 'UPDATE_SUCCESS', data: {}}
//         return state;
//     },
//     [ types.UPDATE_YEARS_FAILED ]: ( state, action ) => {
//         state = {progress: false, status: 'UPDATE_FAILED', data: action.payload}
//         return state;
//     },
//     [ types.DELETE_YEARS ]: ( state, action ) => {
//         return state;
//     },
//     [ types.DELETE_YEARS_COMPLETED ]: ( state, action ) => {
//         state = {progress: false, status: 'DELETE_SUCCESS', data: action.payload}
//         return state;
//     },
//     [ types.DELETE_YEARS_FAILED ]: ( state, action ) => {
//         state = {progress: false, status: 'DELETE_FAILED', data: action.payload}
//         return state;
//     }
// });

const toggleEditClassReducer = createReducer( false )( {
    [ types.OPEN_EDIT_CLASS ]: ( state, action ) => {
        state = true;
        return state;
    },
    [ types.CLOSE_EDIT_CLASS ]: ( state, action ) => {
        state = false;
        return state;
    }
});



export default combineReducers( {
    allClasses: allClassesReducer,
    getClass: getClassReducer,
    toggleEditClass: toggleEditClassReducer,
} );