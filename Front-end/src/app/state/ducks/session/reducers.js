import { combineReducers } from "redux";
import * as types from "./types";
import * as utils from './utils';
import { createReducer } from "../../utils";
import { history } from '../../utils';

let user = sessionStorage.getItem('user');

const initialState = user ? { loggedIn:true, user } : {};

const authReducer = createReducer( initialState )( {
    [ types.LOGIN_COMPLETED ]: ( state = initialState, action ) => {
        if (action.payload) {
            utils.saveJwtTokenOnTheStograte(action.payload.id_token);
        }
        history.push('/administrator/home');
        state = {
            loggedIn:true, 
            user: action.payload.id_token
        }
        return state;
    },
    [ types.LOGIN_FAILED ]: ( state = initialState, action ) => {
        state = {
            loggedIn: false,
            user: 'Login failed'
        }
        return state;
    },
    [ types.LOGOUT ]: ( state, action ) => {
        return state;
    }
} );

export default combineReducers( {
    isAuthenticated: authReducer
} );