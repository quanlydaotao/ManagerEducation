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
                <img src="https://image.flaticon.com/icons/svg/1040/1040214.svg" alt="" style={{width: '10%'}}/>
            </div>
        );
    }
}
export default HomeAdmin;
