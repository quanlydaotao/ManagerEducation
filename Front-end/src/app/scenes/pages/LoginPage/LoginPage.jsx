import React, { Component } from 'react';
import styles from './styles.css';
import { Top } from './Top';
import { Panel } from './Panel';

class LoginPage extends Component {
    componentDidMount() {
        document.title = 'Đăng nhập';
    }
    render() {
        return (
            <React.Fragment>
                <Top />
                <Panel />
            </React.Fragment>
        );
    }
}

export default LoginPage;
