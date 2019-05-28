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
                    <Route exact path="/administrator/education" render={() => (
                        <Redirect to="/administrator/education/years" />
                    )} />  
                </Switch>
                <DocumentTitle title='.:Quản lý lớp học:.'>
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

