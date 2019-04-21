import React, { Component } from 'react';
import styles from './style.css';
import { LoginWrapper } from '../LoginWrapper';
import { PageWrapperAdmin } from '../PageWrapperAdmin';
import { Route, Switch, Redirect } from 'react-router-dom';
import { PrivateRoute } from '../../../state/utils';
import { history } from '../../../state/utils';

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
                <Switch>
                    <Route exact path="/" render={() => (
                        <Redirect to="/auth/login" />
                    )} />
                    <Route exact path="/auth" render={() => (
                        <Redirect to="/auth/login" />
                    )} />
                    <Route exact path="/auth/login" component={LoginWrapper} />
                    <Route exact path="/administrator" render={() => (
                        <Redirect to="/administrator/home" />
                    )} />
                    <PrivateRoute path="/administrator" component={PageWrapperAdmin} />
                </Switch>
            </div>
        );
    }
}
export default App;




