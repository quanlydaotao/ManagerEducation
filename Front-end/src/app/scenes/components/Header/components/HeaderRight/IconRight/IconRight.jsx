import React from 'react';
import styles from './styles.css';

const IconRight = () => {
    return (
        <div className={`${styles.iconRight}`}>
            <a href="#"><i class="fa fa-bell-o" aria-hidden="true"></i></a>&nbsp;&nbsp;&nbsp;&nbsp;
            <a href="#"><i class="fa fa-question-circle-o" aria-hidden="true"></i></a>
        </div>
    );
}

export default IconRight;
