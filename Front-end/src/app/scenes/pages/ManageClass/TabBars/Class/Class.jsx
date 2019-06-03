import React, { Component, Suspense } from 'react';
import styles from './styles.css';
const TableSearch = React.lazy(() => import('./TableSearch/TableSearch'));
const FormAddClass = React.lazy(() => import('./FormAddClass/FormAddClass'));
import { Switch, Route } from 'react-router-dom';
import DocumentTitle from 'react-document-title';

class Class extends Component {
	render() {
		return (
			<DocumentTitle title=".:Hệ thống lớp học:.">
				<div className={`${styles.Class}`}>
					<Suspense fallback={''}>
						<Switch>
                            <Route exact path="/administrator/education/classes" render={() => (
                                <TableSearch />
                            )} />
                            <Route exact path="/administrator/education/classes/add-new" render={() => (
                                <FormAddClass />
                            )} />
                        </Switch>
					</Suspense>
				</div>
			</DocumentTitle>
		);
	}
}

export default Class;

