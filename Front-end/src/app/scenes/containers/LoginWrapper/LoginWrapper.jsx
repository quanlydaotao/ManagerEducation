import React from 'react';
import styles from './styles.css';
import { LoginPage } from '../../pages/LoginPage';

const LoginWrapper = () => {
    return (
        <div className={`${styles.login}`}>
            <div className={`${styles.consLg}`}>
                <div className={`container ${styles.wrapContainer}`}>
                    <LoginPage />
                </div>
            </div>
        </div>
    );
}

export default LoginWrapper;