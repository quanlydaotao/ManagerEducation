import React, { Component, Suspense } from 'react';
import styles from './style.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import { PrivateRoute } from '../../../state/utils';
import { PageWrapperAdmin } from '../PageWrapperAdmin';

class App extends Component {
    constructor(props) {
        super(props);
    }
    authenticate() {
        return new Promise(resolve => setTimeout(resolve, 2000))
    }
    componentDidMount() {
        this.authenticate().then(() => {
            const ele = document.getElementById('ipl-progress-indicator')
            if (ele) {
                // fade out
                ele.classList.add('available')
                setTimeout(() => {
                    // remove from DOM
                    ele.outerHTML = ''
                }, 2000)
            }
        })
    }
    render() {
        return (
            <div className={`${styles.wrapper}`}>
            <Suspense fallback="">
                <Switch>
                    {/* Redirect the login page  if the url is "/" */}
                    <Route 
                        exact 
                        path="/" 
                        render={() => (
                            <Redirect to="/auth/login" />
                        )} 
                    />

                    {/* Redirect the login page if the url is "/auth" */}
                    <Route 
                        exact 
                        path="/auth" 
                        render={() => (
                            <Redirect to="/auth/login" />
                        )} 
                    />

                    {/* Login page "/" */}
                    <Route 
                        exact 
                        path="/auth/login" 
                        component={ React.lazy(()=> import('../LoginWrapper/LoginWrapper')) } 
                    />

                    {/* Redirect the administrator page if the url is "/administrator" */}
                    <Route 
                        exact 
                        path="/administrator" 
                        render={() => (
                            <Redirect to="/administrator/home" />
                        )} 
                    />

                    {/* Private router for authentication */}
                    <PrivateRoute 
                        path="/administrator" 
                        component={ PageWrapperAdmin } 
                    />
                </Switch>
            </Suspense>
            </div>
        );
    }
}
export default App;




