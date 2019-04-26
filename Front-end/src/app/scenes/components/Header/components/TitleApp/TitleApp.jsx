import React, { Component } from 'react';
import styles from './styles.css';

class TitleApp extends Component {
    render() {
        const { md, sm, xs } = this.props;
        return (
            <div className={`col-md-${md} col-sm-${sm} col-xs-${xs}`}>
                <div className={`${styles.titleApp}`}>
                    <h1>HỆ THỐNG QUẢN LÝ ĐÀO TẠO CMOS-EDU</h1>
                </div>
            </div>
        );
    }
}

export default TitleApp;
