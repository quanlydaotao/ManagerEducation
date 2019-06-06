import React from 'react';
import styles from './styles.css';

const DescriptionPanel = () => {
    return (
        <div className="loginInfo">
            <div className="logoPanel">
                <h3 className="titleLogin">Thông báo</h3>
            </div>
            {/* logopanel */}
            <div id="divscroll" className={`${styles.logContent}`}>
                <ul>
                    <li>Người dùng chưa có Mã đăng nhập vui lòng liên hệ trung tâm đào tạo để đăng ký và được cấp mã đăng nhập.</li>
                    <li>Người dùng sử dụng trình duyệt Chrome trên Điện thoại không đăng nhập được hệ thống, vào <b>Cài đặt (Settings) &gt; Trình tiết kiệm dữ liệu (Data Saver) &gt; Chọn Tắt (Off)</b> để đăng nhập vào hệ thống bình thường.</li>
                </ul>
            </div>
        </div>
    );
}

export default DescriptionPanel;
