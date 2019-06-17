import React, { Component } from 'react';
import styles from './styles.css';
import { ButtonSwitch } from '../../../../../../../../components/Buttons/ButtonSwitch';

const CardClass = (props) => {
    const { data } = props;
    return (
        <div className={`${styles.cardClass}`}>
            <div className={`${styles.topCard}`}>
                <a href="#">{data.name}</a>
                <br />
                <span>Mã lớp: {data.classCode} </span>
                <br />
                <span>Phòng học: {data.classRoom} </span>
                <br /><br />
                <span>27 sinh viên</span>
            </div>
            <hr className="tall" />
            <div className={`${styles.bottomCard}`}>
                <p style={{ marginBottom: 0 }}><b>Mô tả :</b> {data.describe}</p>
                <span><b>Giảng viên :</b> Hoàng Thị Yến</span>
                <br />
                <span><b>Trạng thái :</b> {data.status ? 'Lớp đang mở' : 'Lớp đã đóng'}</span>
            </div>
            <div className={`${styles.footerCard}`}>
                <div style={{position: 'absolute', top: 12, left: 17}}>
                    <ButtonSwitch status={data.status} />
                </div>
                <a href="#">
                    <i class="fa fa-folder-o" aria-hidden="true"></i>
                </a>
            </div>
        </div>
    );
}

export default CardClass;