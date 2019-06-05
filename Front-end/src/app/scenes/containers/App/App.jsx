import React, { Component, Suspense } from 'react';
import styles from './style.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import { PrivateRoute } from '../../../state/utils';
import { PageWrapperAdmin } from '../PageWrapperAdmin';

class App extends Component {
    render() {
        return (
            <div className={`${styles.wrapper}`}>
            <Suspense fallback="">
                <Switch>
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
                        component={ React.lazy(()=> import('../LoginWrapper/LoginWrapper')) } 
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
                        component={ PageWrapperAdmin } 
                    />
                </Switch>
            </Suspense>
            </div>
        );
    }
}
export default App;




