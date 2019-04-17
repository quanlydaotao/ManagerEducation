import React from 'react';
import styles from './styles.css';

const ButtonSwitch = () => {
    return (
        <label className={`${styles.switch}`}>
            <input type="checkbox" />
            <span className={`${styles.slider} ${styles.round}`} />
        </label>
    );
}

export default ButtonSwitch;
