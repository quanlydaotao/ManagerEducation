import React from 'react';
import styles from './styles.css';
import { LoginPage } from '../../pages/LoginPage';

const LoginWrapper = () => {
    return (
        <div className={`${styles.login}`}>
            <div className={`${styles.consLg}`}>
                <LoginPage />
            </div>
        </div>
    );
}

export default LoginWrapper;