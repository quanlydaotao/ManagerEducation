import React, { Component, Suspense } from 'react';
import styles from './styles.css';
const TableSearch = React.lazy(() => import('./TableSearch/TableSearch'));
import DocumentTitle from 'react-document-title';

class Class extends Component {
	render() {
		return (
			<DocumentTitle title=".:Hệ thống lớp học:.">
				<div className={`${styles.Class}`}>
					<Suspense fallback={''}>
						<TableSearch />
					</Suspense>
				</div>
			</DocumentTitle>
		);
	}
}

export default Class;

