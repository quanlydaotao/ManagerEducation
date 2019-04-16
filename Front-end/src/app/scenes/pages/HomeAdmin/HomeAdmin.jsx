import React, { Component } from 'react';
import styles from './styles.css';
import { Link, NavLink } from 'react-router-dom';
import { Breadcumbs } from '../../components/Breadcumbs';


class HomeAdmin extends Component {
    componentDidMount() {
        document.title = '.:HỆ THỐNG QUẢN LÝ ĐÀO TẠO E-FINGTER:.';
    }
    render() {
        return (
            <div className={`${styles.mainHomeAdmin}`}>
                <Breadcumbs breadcums="Trang chủ" />
                <hr className="tall"/>
            </div>
        );
    }
}
export default HomeAdmin;
