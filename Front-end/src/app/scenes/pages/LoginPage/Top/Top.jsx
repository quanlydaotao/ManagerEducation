import React from 'react';
import styles from './styles.css';
import { Logo } from '../../../components/Logo'

const Top = () => {
    return (
        <div className={`${styles.topLoginPage}`}>
            <div className={`row`}>
                <div className={`col-md-6`}>
                    <Logo />
                </div>
                <div className={`col-md-6 text-right`}>
                    <div class={`${styles.hotlineLoginPage} clearfix`}>
                        <p>HOTLINE :</p>
                        <h2>1800 8000 Nhánh số 2</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Top;
