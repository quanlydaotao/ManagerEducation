import React, { Component } from 'react';
import styles from './styles.css';
import { Link, NavLink } from 'react-router-dom';
import { Breadcumbs } from '../../components/Breadcumbs';
import { SectionClassRoom } from './SectionClassRoom';
import DocumentTitle from 'react-document-title';


class HomeAdmin extends Component {
    render() {
        return (
            <DocumentTitle title='.:HỆ THỐNG QUẢN LÝ ĐÀO TẠO E-FINGTER:.'>
                <div className={`${styles.mainHomeAdmin}`}>
                    <Breadcumbs breadcums="Trang chủ" />
                    <hr className="tall"/>
                    <SectionClassRoom />
                    <SectionClassRoom />
                </div>
            </DocumentTitle>
        );
    }
}
export default HomeAdmin;
