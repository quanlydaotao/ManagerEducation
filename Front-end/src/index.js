import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import './assets/css/Site.css';
import './assets/js/Site';
import { configStore } from './app/state/store';
import { history } from './app/state/utils';
import { PrivateRoute } from './app/state/utils';
import { PageWrapperAdmin } from './app/scenes/containers/PageWrapperAdmin';

const store = configStore(
    window.REDUX_INITIAL_DATA
);

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Suspense fallback="">
                <Route
                    exact
                    path="/"
                    render={() => (
                        <Redirect to="/auth/login" />
                    )}
                />
                <Route
                    exact
                    path="/auth"
                    render={() => (
                        <Redirect to="/auth/login" />
                    )}
                />
                <Route
                    exact
                    path="/auth/login"
                    component={React.lazy(() => import('./app/scenes/containers/LoginWrapper/LoginWrapper'))}
                />
                <Route
                    exact
                    path="/admin"
                    render={() => (
                        <Redirect to="/admin/home" />
                    )}
                />
                <PrivateRoute
                    path="/admin"
                    component={PageWrapperAdmin}
                />
            </Suspense>
        </Router>
    </Provider>,
    document.getElementById('t')
);
