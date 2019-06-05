import React from 'react';
import styles from './styles.css';
import { Link } from 'react-router-dom';

const Logo = () => {
    return (
        <div className={`${styles.logo}`}>
            <Link to="#" className={`${styles.logoBig}`}></Link>
        </div>
    );
}

export default Logo;
