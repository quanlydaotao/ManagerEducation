import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './app/scenes/containers/App';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import './assets/css/Site.css';
import './assets/js/Site';
import { configStore } from './app/state/store';
import { applyMiddleware } from 'redux';


const store = configStore( 
    window.REDUX_INITIAL_DATA
);

ReactDOM.render(
    <Provider store = { store }>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('t')
);
