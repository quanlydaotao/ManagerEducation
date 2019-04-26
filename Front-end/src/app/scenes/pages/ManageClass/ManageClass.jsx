import React, { Component } from 'react';
import styles from './styles.css';

class ManageClass extends Component {
    componentDidMount() {
        document.title = '.:Quản lý lớp học:.';
    }
    render() {
        return (
            <div className={`${styles.mainManageClass}`}>
            </div>
        );
    }
}

export default ManageClass;

