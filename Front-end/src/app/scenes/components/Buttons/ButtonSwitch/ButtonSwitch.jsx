import React from 'react';
import styles from './styles.css';

const ButtonSwitch = (props) => {
    return (
        <label className={`${styles.switch}`}>
            <input type="checkbox" checked={props.status}/>
            <span className={`${styles.slider} ${styles.round}`} />
        </label>
    );
}

export default ButtonSwitch;
