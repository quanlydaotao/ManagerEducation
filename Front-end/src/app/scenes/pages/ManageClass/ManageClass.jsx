import React, { Component, Suspense } from 'react';
import styles from './styles.css';
import DocumentTitle from 'react-document-title';
import { TabBars } from './TabBars';

class ManageClass extends Component {
    render() {
        return (
        	<DocumentTitle title='.:Quản lý lớp học:.'>
                <React.Fragment>
    	            <div className={`${styles.mainManageClass}`}>
    					<TabBars />
    	            </div>
                </React.Fragment>
            </DocumentTitle>
        );
    }
}

export default ManageClass;

