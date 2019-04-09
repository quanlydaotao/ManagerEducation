import {
    createStore,
    combineReducers,
    applyMiddleware
} from 'redux';
import thunkMiddleware from "redux-thunk";
import toggleMenuReducer from '../ducks/toggleMenu';
import searchHeaderReducer from '../ducks/searchHeader';
import menuReducer from '../ducks/menu';
import bannerReducer from '../ducks/banner';
import {
    apiService,
    createLogger
} from "../middlewares";

export default function configStore(initialState) {
    const rootReducer = combineReducers({
        toggleMenuReducer,
        searchHeaderReducer,
        menuReducer,
        bannerReducer
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