import React, { Component } from 'react';
import styles from './styles.css';
import { Top } from './components/Top';
import { Panel } from './components/Panel';
import DocumentTitle from 'react-document-title';

const LoginPage = () => {
    return (
        <DocumentTitle title='Đăng nhập'>
            <React.Fragment>
                <Top />
                <Panel />
            </React.Fragment>
        </DocumentTitle>
    );
}

export default LoginPage;
