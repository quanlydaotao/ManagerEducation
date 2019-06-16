import React, { Component } from 'react';
import styles from './styles.css';
import { Sort } from '../../../../../../../../components/Sort';

const LabelYears = (props) => {
    const { title, timeOpen } = props;
    return (
        <div className={`${styles.labelYears} clearfix`}>
            <div className={`${styles.imgLabel}`}><img src="https://image.flaticon.com/icons/svg/1040/1040214.svg" alt="" style={{ width: '55px' }} /></div>
            <div className={`${styles.mainLabel}`}>
                <h2>NĂM HỌC : { title ? title : '[ Chưa chọn năm học ]'}</h2>
                <span>Khai giảng: { timeOpen ? timeOpen : 'Chưa chọn năm học' }</span>
            </div>
            <div className={`${styles.sortClass}`}>
                <Sort/>
            </div>
        </div>
    );
}

export default LabelYears;