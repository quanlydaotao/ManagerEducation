import React from 'react';
import styles from './styles.css';
import { Logo } from '../Logo';

const Header = () => {
    return (
        <header id="header" className={`${styles.headerMain}`}>
            <div className={`container-fluid ${styles.ctn}`}>
                <div className="row">
                    <div className={`col-md-2 col-sm-3 col-3 ${styles.logo}`}>
                        <Logo />
                    </div>
                    <div className={`col-md-7 col-sm-6 col-6`}>
                        <div className={`${styles.titleSystem}`}>
                            <h1>HỆ THỐNG QUẢN LÝ ĐÀO TẠO E-FINGTER</h1>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-3 col-3" style={{ textAlign: "right" }}>
                        <div className={`${styles.headerRight}`}>
                            <div className={`${styles.iconBar}`}>
                                <ul className={`${styles.account}`}>
                                    <li className={`nav-item dropdown ${styles.imgAccount}`}>
                                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <img src="https://scontent.fhan3-2.fna.fbcdn.net/v/t1.0-1/c0.4.24.24a/p24x24/57172530_2234155986835239_6197852354629337088_n.jpg?_nc_cat=103&_nc_oc=AQmDvsTNizuT067tFGvFr_8-Bb9He6qKz2V2fAHnD7An4XgCK-UX9LPSbOmuaxjRHLY&_nc_ht=scontent.fhan3-2.fna&oh=01c58ea772085946d416985be756810b&oe=5D4C4D0D" alt="" />
                                            <span style={{ fontSize: 13 }}>Huy Đức</span>
                                        </a>
                                        <div className={`dropdown-menu ${styles.dropdownWrap}`} aria-labelledby="navbarDropdown">
                                            <a className="dropdown-item" href="#"><i class="fa fa-user" aria-hidden="true"></i>&nbsp;&nbsp;Profile</a>
                                            <a className="dropdown-item" href="#"><i class="fa fa-cogs" aria-hidden="true"></i>&nbsp;&nbsp;Settings</a>
                                            <div className="dropdown-divider" />
                                            <a className="dropdown-item" href="#"><i class="fa fa-power-off" aria-hidden="true"></i>&nbsp;&nbsp;Logout</a>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className={`${styles.iconRight}`}>
                                <a href="#"><i class="fa fa-bell-o" aria-hidden="true"></i></a>&nbsp;&nbsp;&nbsp;&nbsp;
                                <a href="#"><i class="fa fa-question-circle-o" aria-hidden="true"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
