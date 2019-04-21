import React, { Component } from 'react';
import styles from './styles.css';
import { Top } from './Top';
import { Panel } from './Panel';
import DocumentTitle from 'react-document-title';

class LoginPage extends Component {
    render() {
        return (
            <DocumentTitle title='Đăng nhập'>
                <React.Fragment>
                    <Top />
                    <Panel />
                </React.Fragment>
            </DocumentTitle>
        );
    }
}

export default LoginPage;
