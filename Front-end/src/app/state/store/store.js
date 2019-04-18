import { createStore,combineReducers,applyMiddleware } from 'redux';
import thunkMiddleware from "redux-thunk";
import * as reducer from '../ducks';
import { apiService, createLogger } from "../middlewares";

export default function configStore(initialState) {
    const rootReducer = combineReducers ( reducer );

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