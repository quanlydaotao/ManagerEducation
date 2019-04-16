import React from 'react';
import styles from './styles.css';

const TopMenu = () => {
    return (
        <div className={`${styles.headerTopMenu} clearfix`}>
            <div style={{float: 'left'}}>
                <img src="https://static.topcv.vn/avatars/oQxJKFwadpHLafsdKhiN_5abb3b5be3749_cvtpl.jpg?1555309722" alt="" />
            </div>
            <div style={{float: 'left'}}>
                <ul className={`${styles.detailtAccount}`}>
                    <li>
                        <i class="fa fa-user-circle" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;Đào Huy Đức
                    </li>
                    <li>
                        <i class="fa fa-id-card" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;Administrator
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default TopMenu;
