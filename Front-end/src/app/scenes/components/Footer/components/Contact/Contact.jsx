import React from 'react';
import styles from './style.css';

const Contact = () => {
    return (
        <div className={`footer-section ${styles.contact}`}>
            <h2 className="footer-title">
                THÔNG TIN LIÊN HỆ
            </h2>
            <div className="info">
                <p>Đại diện: Nguyễn Đức Hiếu</p>
                <p>Mã ĐKKD: 01A8016500</p>
                <p>Điện thoại: 0971.220.266</p>
                <p>Địa chỉ: Số 131 Kim Mã, P.Kim Mã, Q.Ba Đình, TP Hà Nội</p>
                <p>Do phòng TC-KH Quận Ba Đình cấp ngày 24 tháng 3 năm 2014</p>
            </div>
        </div>
    )
}

export default Contact;
