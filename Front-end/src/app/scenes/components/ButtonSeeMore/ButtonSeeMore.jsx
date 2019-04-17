import React from 'react';
import styles from './styles.css';

const ButtonSeeMore = () => {
    return (
        <a href="javascript:void(0)" className={`btn btn-primary ${styles.buttonSeeMore}`}>Xem thêm <i class="fa fa-chevron-circle-right" aria-hidden="true"></i></a>
    );
}

export default ButtonSeeMore;
