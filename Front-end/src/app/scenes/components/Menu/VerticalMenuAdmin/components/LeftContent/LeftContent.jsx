import React from 'react';
import styles from './styles.css';
import { NavLink } from 'react-router-dom';

const LeftContent = () => {
    return (
        <div className={`${styles.leftContent}`}>
            <ul className={`${styles.wrapperContentLeft}`}>
                <li>
                    <NavLink exact to="/administrator/home" activeClassName={`${styles.activeStyle}`}><i class="fa fa-home" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;TRANG CHỦ</NavLink>
                    <hr className="tall"/>
                </li>
                <li>
                    <NavLink to="/administrator/class" activeClassName={`${styles.activeStyle}`}><i class="fa fa-cogs" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;QUẢN LÝ LỚP HỌC</NavLink>
                    <hr className="tall"/>
                </li>
                <li>
                    <NavLink to="/administrator/account" activeClassName={`${styles.activeStyle}`}><i class="fa fa-user-plus" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;QUẢN LÝ TÀI KHOẢN</NavLink>
                    <hr className="tall"/>
                </li>
                <li>
                    <NavLink to="/administrator/change-password" activeClassName={`${styles.activeStyle}`}><i class="fa fa-lock" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;THAY ĐỔI MẬT KHẨU</NavLink>
                    <hr className="tall"/>
                </li>
                <li>
                    <NavLink to="/administrator/tuition" activeClassName={`${styles.activeStyle}`}><i class="fa fa-credit-card" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;QUẢN LÝ HỌC PHÍ</NavLink>
                </li>
            </ul>
        </div>
    );
}

export default LeftContent;
