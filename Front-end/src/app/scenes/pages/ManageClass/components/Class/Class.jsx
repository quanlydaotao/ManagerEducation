import React, { Component, Suspense } from 'react';
import styles from './styles.css';
const TableList = React.lazy(() => import('./components/TableList/TableList'));
const FormAddCategory = React.lazy(() => import('./components/FormAddCategory/FormAddCategory'));
const FormAddDetail = React.lazy(() => import('./components/FormAddDetail/FormAddDetail'));
const EditClass = React.lazy(() => import('./components/EditClass/EditClass'));
import { Switch, Route, Redirect } from 'react-router-dom';

class Class extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dataSelector: { name: '', year: 0, course: 0, nameYear: '', nameCourse: '' }
		}
	}
	getYearAndCourse = (params) => {
		this.setState({ dataSelector: params });
	}
	render() {
		const { dataSelector } = this.state;
		return (
			<div className={`${styles.Class}`}>
				<Suspense fallback={''}>
					<Switch>
						<Route exact path="/admin/edu/classes" render={() => (
							<TableList />
						)} />
						<Route path="/admin/edu/classes/category" render={() => {
							if (dataSelector.year === 0 && dataSelector.course === 0) {
								return <FormAddCategory setYearAndCourse={this.getYearAndCourse} />;
							} else {
								return <Redirect to="/admin/edu/classes/new" push={true} />;
							}
						}} />
						<Route path="/admin/edu/classes/new" render={() => {
							if (dataSelector.year === 0 && dataSelector.course === 0) {
								return <Redirect to="/admin/edu/classes/category" />;
							} else {
								return <FormAddDetail data={dataSelector} setYearAndCourse={this.getYearAndCourse} />;
							}
						}} />
						<Route exact path="/admin/edu/classes/:id" component={EditClass} />
					</Switch>
				</Suspense>
			</div>
		);
	}
}

export default Class;

