import React from 'react';
import styles from './styles.css';
import { Logo } from '../Logo';
import { TitleApp } from './components/TitleApp';
import { HeaderRight } from './components/HeaderRight';

const Header = () => {
    return (
        <header id="header" className={`${styles.headerMain}`}>
            <div className={`container-fluid ${styles.ctn}`}>
                <div className="row">
                    <div className={`col-md-2 col-sm-3 col-xs-3 ${styles.logo}`}>
                        <Logo />
                    </div>
                    <TitleApp md="7" sm="6" xs="6"/>
                    <HeaderRight md="3" sm="3" xs="3" />
                </div>
            </div>
        </header>
    );
}

export default Header;
