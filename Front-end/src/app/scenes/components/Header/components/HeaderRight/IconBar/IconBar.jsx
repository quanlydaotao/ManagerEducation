import React, { Component } from 'react';
import styles from './styles.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { sessionOperations } from '../../../../../../state/ducks/session';

class IconBar extends Component {
    logout = () => {
        this.props.logout();
    }
    render() {
        return (
            <div className={`${styles.iconBar}`}>
                <ul className={`${styles.account}`}>
                    <li className={`nav-item dropdown ${styles.imgAccount}`}>
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <img src="https://scontent.fhan3-2.fna.fbcdn.net/v/t1.0-1/c0.4.24.24a/p24x24/57172530_2234155986835239_6197852354629337088_n.jpg?_nc_cat=103&_nc_oc=AQmDvsTNizuT067tFGvFr_8-Bb9He6qKz2V2fAHnD7An4XgCK-UX9LPSbOmuaxjRHLY&_nc_ht=scontent.fhan3-2.fna&oh=01c58ea772085946d416985be756810b&oe=5D4C4D0D" alt="" />
                            <span style={{ fontSize: 13 }}>Huy Đức</span>
                        </a>
                        <div className={`dropdown-menu ${styles.dropdownWrap}`} aria-labelledby="navbarDropdown">
                            <a className="dropdown-item" href="#"><i class="fa fa-user" aria-hidden="true"></i>&nbsp;&nbsp;Tài khoản</a>
                            <a className="dropdown-item" href="#"><i class="fa fa-cogs" aria-hidden="true"></i>&nbsp;&nbsp;Cài đặt tài khoản</a>
                            <div className="dropdown-divider" />
                            <a className="dropdown-item" href="javascript:void(0)" onClick={() => this.logout()}><i class="fa fa-power-off" aria-hidden="true"></i>&nbsp;&nbsp;Đăng xuất</a>
                        </div>
                    </li>
                </ul>
            </div>
        );
    }
}

IconBar.PropTypes = {
    logout: PropTypes.func.isRequired
}

const mapDispatchToProps = {
    logout: sessionOperations.logout
};

export default connect(null, mapDispatchToProps)(IconBar);
