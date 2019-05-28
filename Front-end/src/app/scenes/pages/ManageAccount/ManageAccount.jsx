import React, { Suspense } from 'react';
import styles from './styles.css';
import DocumentTitle from 'react-document-title';
import { TabBars } from './TabBars';
import { NavLink, Route, Switch, Redirect } from 'react-router-dom';

const ManageAccount = () => {
    return (
        <React.Fragment>
        	<Switch>
        		<Route exact path="/administrator/accounts" render={() => (
					<Redirect to="/administrator/accounts/users" />
        		)}/>
        	</Switch>
        	<DocumentTitle title='.:Quản lý tài khoản:.'>
	            <div className={`${styles.mainManageAccount}`}>
	                <TabBars />
	            </div>
	        </DocumentTitle>
        </React.Fragment>
    );
}

export default ManageAccount;
