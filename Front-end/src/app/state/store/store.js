import {
    createStore,
    combineReducers,
    applyMiddleware
} from 'redux';
import thunkMiddleware from "redux-thunk";
import {
    apiService,
    createLogger
} from "../middlewares";

export default function configStore(initialState) {
    const rootReducer = combineReducers({
        // toggleMenuReducer,
        // searchHeaderReducer,
        // menuReducer,
        // bannerReducer
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