import React, { Component } from 'react';
import styles from './styles.css';
import { SectionClassRoom } from './components/SectionClassRoom';
import DocumentTitle from 'react-document-title';
import LazyLoad from 'react-lazyload';


const HomeAdmin = () => {
    return (
        <DocumentTitle title='.:HỆ THỐNG QUẢN LÝ ĐÀO TẠO G-ADMIN:.'>
            <div className={`${styles.mainHomeAdmin}`}>
                <LazyLoad>
                    <SectionClassRoom />
                </LazyLoad>
                <LazyLoad>
                    <SectionClassRoom />
                </LazyLoad>
            </div>
        </DocumentTitle>
    );
}
export default HomeAdmin;
