import React, { Component } from 'react';
import styles from './styles.css';

class CardClass extends Component {
    render() {
        return (
            <div className={`${styles.cardClass}`}>
                <div className={`${styles.topCard}`}>
                    <a href="#">Tiếng anh 1</a>
                    <br/>
                    <br/>
                    <span>Lớp 1.1</span>
                    <br/><br/>
                    <span>27 sinh viên</span>
                </div>
                <hr className="tall"/>
                <div className={`${styles.bottomCard}`}>
                    <p style={{marginBottom: 0}}><b>Mô tả :</b> Lớp khai giảng dành cho các sinh viên học lại</p>
                    <span><b>Giảng viên :</b> Hoàng Thị Yến</span>
                    <br/>
                    <span><b>Trạng thái :</b> Lớp đã đóng</span>
                </div>
                <div className={`${styles.footerCard}`}>
                    <a href="#">
                        <i class="fa fa-folder-o" aria-hidden="true"></i>
                    </a>
                </div>
            </div>
        );
    }
}

export default CardClass;