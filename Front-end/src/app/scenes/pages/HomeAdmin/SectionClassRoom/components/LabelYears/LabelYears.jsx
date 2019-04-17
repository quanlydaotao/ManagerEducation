import React, { Component } from 'react';
import styles from './styles.css';

class LabelYears extends Component {
    render() {
        return (
            <div className={`${styles.labelYears} clearfix`}>
                <div className={`${styles.imgLabel}`}><img src="https://image.flaticon.com/icons/svg/1040/1040214.svg" alt="" style={{width: '55px'}}/></div>
                <div className={`${styles.mainLabel}`}>
                    <h2>Khóa học : 2018 - 2019</h2>
                    <span>Khai giảng: 20/03/2019</span>
                </div>
            </div>
        );
    }
}

export default LabelYears;