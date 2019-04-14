import {
    createStore,
    combineReducers,
    applyMiddleware
} from 'redux';
import { sessionReducer, redirectAfterLoginReducer } from '../ducks/session';
import thunkMiddleware from "redux-thunk";
import {
    apiService,
    createLogger
} from "../middlewares";

export default function configStore(initialState) {
    const rootReducer = combineReducers({
        sessionReducer,
        redirectAfterLoginReducer
    });

    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(
            apiService,
            thunkMiddleware,
            createLogger(true)
        )
    );
}