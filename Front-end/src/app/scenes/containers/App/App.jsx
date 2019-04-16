import React, { Component } from 'react';
import styles from './style.css';
import { LoginWrapper } from '../LoginWrapper';
import { PageWrapperAdmin } from '../PageWrapperAdmin';
import routes from "../../../routes";
import { Route, Switch, Redirect } from 'react-router-dom';

class App extends Component {

    render() {
        return (
            <div className={`${styles.wrapper}`}>
                <Switch>
                    <Route exact path="/" render={() => (
                        <Redirect to="/login" />
                    )} />
                    <Route path="/login" component={LoginWrapper} />
                    <Route path="/admin" component={PageWrapperAdmin} />
                </Switch>
            </div>
        );
    }
}

export default App;




