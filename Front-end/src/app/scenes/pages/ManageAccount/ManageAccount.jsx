import React, { Component } from 'react';
import styles from './styles.css';
import DocumentTitle from 'react-document-title';
import { ButtonAdd } from '../../components/ButtonAdd';
import { TabBars } from './TabBars';

const ManageAccount = () => {
    return (
        <DocumentTitle title='.:Quản lý tài khoản:.'>
            <div className={`${styles.mainManageAccount}`}>
                <TabBars />
                <div className={`${styles.fixed}`}>
                    <ButtonAdd />
                </div>
            </div>
        </DocumentTitle>
    );
}


export default ManageAccount;
