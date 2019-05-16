import React, { Suspense } from 'react';
import styles from './styles.css';
import DocumentTitle from 'react-document-title';
import { TabBars } from './TabBars';
import { Route } from 'react-router-dom';

const ManageAccount = () => {
    return (
        <DocumentTitle title='.:Quản lý tài khoản:.'>
            <React.Fragment>
                <div className={`${styles.mainManageAccount}`}>
                    <TabBars />
                </div>
            </React.Fragment>
        </DocumentTitle>
    );
}

export default ManageAccount;
