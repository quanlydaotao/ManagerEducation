import React from 'react';
import styles from './style.css';
import logo from './images/logo.png';

const LogoShop = () => (
    <a id={styles.hr_logo} href="http://localhost:5000/">
        <img src={logo} className={`${styles.logo}`} alt="Lụa hạnh tiến" />
    </a>
)

export default LogoShop;