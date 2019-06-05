import React, { Component, Suspense } from 'react';
import styles from './styles.css';
import DocumentTitle from 'react-document-title';
import { TabBars } from './TabBars';
import { Route, Switch, Redirect } from 'react-router-dom';

class ManageClass extends Component {
    render() {
        return (
        	<React.Fragment>
                <Switch>
                    <Route exact path="/admin/edu" render={() => (
                        <Redirect to="/admin/edu/years" />
                    )} />
                </Switch>
                <DocumentTitle title='.:Năm học đào tạo:.'>
                    <React.Fragment>
                        <div className={`${styles.mainManageClass}`}>
                            <TabBars />
                        </div>
                    </React.Fragment>
                </DocumentTitle>
            </React.Fragment>
        );
    }
}

export default ManageClass;
