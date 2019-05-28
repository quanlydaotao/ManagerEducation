import React, { Component, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import styles from './styles.css';
import { ActionBar } from './components/ActionBar';
const EnhancedTableYears = React.lazy(() => import('./EnhancedTableYear/EnhancedTableYear'));
const FormAddNewYears = React.lazy(() => import('./FormAddNewYears/FormAddNewYears'));

class Years extends Component {
	render() {
		return (
			<div className="row">
                <div className="col-md-9">
                	<Switch>
                		<Route exact path="/administrator/education/years" render={() => (
							<Suspense fallback={'Loading...'}>
								<EnhancedTableYears listName="DANH SÁCH CÁC NĂM HỌC ĐÀO TẠO"/>
							</Suspense>
                		)}/>
                		<Route exact path="/administrator/education/years/add-new" render={() => (
							<Suspense fallback={'Loading...'}>
								<FormAddNewYears />
							</Suspense>
                		)}/>
                	</Switch>
                </div>
                <div className="col-md-3">
                	<div className={`${styles.actionBarManageClass}`}>
                        <ActionBar />
                    </div>
                </div>
            </div>

		);
	}
}

export default Years;