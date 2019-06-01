import React, { Component, Suspense } from 'react';
import styles from './styles.css';
const ToolBar = React.lazy(() => import('./ToolBar/ToolBar'));
const EnhancedTableClass = React.lazy(() => import('./EnhancedTableClass/EnhancedTableClass'));
import DocumentTitle from 'react-document-title';

class Class extends Component {
	render() {
		return (
			<DocumentTitle title=".:Hệ thống lớp học:.">
				<div className={`${styles.Class}`}>
					<Suspense fallback={''}>
						<ToolBar />
						<EnhancedTableClass listName="DANH SÁCH CÁC LỚP HỌC ĐÀO TẠO"/>
					</Suspense>
				</div>
			</DocumentTitle>
		);
	}
}

export default Class;

