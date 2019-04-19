import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './app/scenes/containers/App';
import { HashRouter, BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import './assets/css/Site.css';
import './assets/js/Site';
import { configStore } from './app/state/store';
import { history } from './app/state/utils';

const store = configStore( 
    window.REDUX_INITIAL_DATA
);

ReactDOM.render(
    <Provider store = { store }>
        <Router history={ history }>
            <App />
        </Router>
    </Provider>,
    document.getElementById('t')
);
