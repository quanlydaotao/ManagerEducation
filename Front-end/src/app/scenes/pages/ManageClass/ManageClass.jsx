import React, { Component } from 'react';
import styles from './styles.css';
import { Breadcumbs } from '../../components/Breadcumbs';

class ManageClass extends Component {
    componentDidMount() {
        document.title = '.:Quản lý lớp học:.';
    }
    render() {
        return (
            <div className={`${styles.mainManageClass}`}>
                <Breadcumbs breadcums="Quản lý lớp học" />
                <hr className="tall" />
            </div>
        );
    }
}

export default ManageClass;

