import React from 'react';
import styles from './styles.css';

const Sort = () => {
    return (
        <div className={`${styles.sort}`}>
            <select name="" id="input" className="form-control" required="required" style={{ fontSize: 13 }}>
                <option value="">--- Tất cả ---</option>
                <option value="">Lớp đang học</option>
                <option value="">Lớp đã đóng</option>
                <option value="">Lớp đang học mới nhất</option>
                <option value="">Lớp đang học cũ nhất</option>
                <option value="">Lớp đã đóng cũ nhất</option>
                <option value="">Lớp đã đóng mới nhất</option>
            </select>
        </div>
    );
}

export default Sort;
