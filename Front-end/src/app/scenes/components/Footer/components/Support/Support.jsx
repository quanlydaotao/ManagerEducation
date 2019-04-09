import React from 'react';
import styles from './style.css';

const Support = () => {
    return (
        <div className={`footer-section ${styles.support}`}>
            <h2 className="footer-title">
                HỖ TRỢ KHÁCH HÀNG
            </h2>
            <div className="info">
                <p><a href="#">Hệ thống showrooms</a></p>
                <p><a href="#">Hướng dẫn đặt hàng</a></p>
                <p><a href="#">Chính sách mua hàng</a></p>
                <p><a href="#">Chính sách ưu đãi khách hàng</a></p>
                <p><a href="#">Chính sách bảo mật thông tin</a></p>
            </div>
        </div>
    )
}

export default Support;