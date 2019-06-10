import React, { Component, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import styles from './styles.css';
import { ActionBar } from './components/ActionBar';
const EnhancedTableYears = React.lazy(() => import('./components/EnhancedTableYear/EnhancedTableYear'));
const FormAddNewYears = React.lazy(() => import('./components/FormAddNewYears/FormAddNewYears'));
const EditYear = React.lazy(() => import('./components/EditYear/EditYear'));

const Years = () =>{
	return (
		<div className={`${styles.Years}`}>
			<div className="row">
				<div className="col-md-9">
					<Switch>
						<Route exact path="/admin/edu/years" render={() => (
							<Suspense fallback={''}>
								<EnhancedTableYears listName="DANH SÁCH CÁC NĂM HỌC ĐÀO TẠO" />
							</Suspense>
						)} />
						<Route exact path="/admin/edu/years/new" render={() => (
							<Suspense fallback={'Loading...'}>
								<FormAddNewYears />
							</Suspense>
						)} />
						<Route exact path="/admin/edu/years/:id" component={EditYear}/>
					</Switch>
				</div>
				<div className="col-md-3">
					<div className={`${styles.actionBarManageClass}`}>
						<ActionBar />
					</div>
				</div>
			</div>
		</div>
	);
}

export default Years;