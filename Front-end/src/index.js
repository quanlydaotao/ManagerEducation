import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import './assets/css/Site.css';
import './assets/js/Site';
import { configStore } from './app/state/store';
import { history } from './app/state/utils';
import { App } from './app/scenes/containers/App';

const store = configStore(
    window.REDUX_INITIAL_DATA
);

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <App /> 
        </Router>
    </Provider>,
    document.getElementById('t')
);
