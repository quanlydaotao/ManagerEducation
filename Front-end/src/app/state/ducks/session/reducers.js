import { combineReducers } from "redux";
import * as types from "./types";
import * as utils from './utils';
import { createReducer } from "../../utils";
import { history } from '../../utils';
import jwtDecode from 'jwt-decode';

let user = localStorage.getItem('user');

const initialState = user ? { loggedIn:true, user } : {};

const authReducer = createReducer( initialState )( {
    [ types.LOGIN ]: ( state, action ) => {
        return {
            loggedIn: false,
            user: 'progress'
        };
    },
    [ types.LOGIN_COMPLETED ]: ( state, action ) => {
        const token = action.payload.id_token;
        if (token) {
            utils.saveJwtTokenOnTheStograte(action.payload.id_token);
            let decodeToken = jwtDecode(token);
            let roles = decodeToken.auth.trim().split(",");
            var i = 0;
            for (i=0; i<roles.length; i++) {
                if (roles[i] === "ROLE_ADMIN") {
                    history.push('/admin/home');
                    break;
                } else if(roles[i] === "ROLE_TEACHER") {
                    history.push('/teacher/home');
                    break;
                } else if(roles[i] === "ROLE_PARENTS") {
                    history.push('/parents/home');
                    break;
                } else if (roles[i] === "ROLE_STUDENT") {
                    history.push('/student/home');
                    break;
                }
            }
            state = {
                loggedIn:true, 
                user: action.payload.id_token
            }
        }
        return state;
    },
    [ types.LOGIN_FAILED ]: ( state, action ) => {
        state = {
            loggedIn: false,
            user: 'Login failed'
        }
        return state;
    },
    [ types.LOGOUT ]: ( state, action ) => {
        localStorage.removeItem("user");
        history.push('/auth/login?logout=success');
        return {};
    }
} );

export default combineReducers( {
    isAuthenticated: authReducer
} );