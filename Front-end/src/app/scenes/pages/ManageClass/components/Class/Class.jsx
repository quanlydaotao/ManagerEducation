import React, { Component, Suspense } from 'react';
import styles from './styles.css';
const TableList = React.lazy(() => import('./components/TableList/TableList'));
const FormAddCategory = React.lazy(() => import('./components/FormAddCategory/FormAddCategory'));
const FormAddDetail = React.lazy(() => import('./components/FormAddDetail/FormAddDetail'));
import { Switch, Route, Redirect } from 'react-router-dom';
import DocumentTitle from 'react-document-title';

class Class extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dataSelector: {name:'', year: 0, course: 0}
		}
	}
	getYearAndCourse = (params) => {
		this.setState({ dataSelector: params });
	}
	render() {
		const { dataSelector } = this.state;
		return (
			<DocumentTitle title=".:Hệ thống lớp học:.">
				<div className={`${styles.Class}`}>
					<Suspense fallback={''}>
						<Switch>
                            <Route exact path="/admin/edu/classes" render={() => (
                                <TableList />
                            )} />
                            <Route exact path="/admin/edu/classes/add/category" render={() => {
								if (dataSelector.year === 0 && dataSelector.course === 0) {
									return <FormAddCategory setYearAndCourse={this.getYearAndCourse} />;
								} else {
									return <Redirect to="/admin/edu/classes/add/new" />
								}
							}} />
							<Route exact path="/admin/edu/classes/add/new" render={() => {
								if (dataSelector.year === 0 && dataSelector.course === 0) {
									return <Redirect to="/admin/edu/classes/add/category" />;
								} else {
									return <FormAddDetail />;
								}
							}} />
                        </Switch>
					</Suspense>
				</div>
			</DocumentTitle>
		);
	}
}

export default Class;

