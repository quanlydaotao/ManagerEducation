import React, { Component } from 'react';
import styles from './style.css';
import { LoginWrapper } from '../LoginWrapper';
import { PageWrapperAdmin } from '../PageWrapperAdmin';
import { Route, Switch, Redirect } from 'react-router-dom';
import { PrivateRoute } from '../../../state/utils';

class App extends Component {
    constructor(props) {
        super(props);
        // const { dispatch } = this.props;
        // history.listen((location, action) => {
        //     // clear alert on location change
        //     dispatch(alertActions.clear());
        // });
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




