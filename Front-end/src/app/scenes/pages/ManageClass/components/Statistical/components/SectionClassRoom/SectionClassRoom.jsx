import React from 'react';
import styles from './styles.css';
import { LabelYears } from './components/LabelYears';
import { CardClass } from './components/CardClass';
import { ButtonSeeMore } from '../../../../../../components/Buttons/ButtonSeeMore';

const SectionClassRoom = (props) => {
    const { year } = props;
    return (
        <div className={`${styles.secctionClassRoom}`}>
            <LabelYears title={year.startYears} timeOpen={year.openDay} />
            <div className={`${styles.mainSection}`}>
                <div className="row">
                    <div className={`col-md-4 ${styles.mgBt}`}>
                        <CardClass />
                    </div>
                    <div className={`col-md-4 ${styles.mgBt}`}>
                        <CardClass />
                    </div>
                    <div className={`col-md-4 ${styles.mgBt}`}>
                        <CardClass />
                    </div>
                    <div className={`col-md-4 ${styles.mgBt}`}>
                        <CardClass />
                    </div>
                    <div className={`col-md-4 ${styles.mgBt}`}>
                        <CardClass />
                    </div>
                    <div className={`col-md-4 ${styles.mgBt}`}>
                        <CardClass />
                    </div>
                </div>
                <div align="center" style={{ marginBottom: 30 }}>
                    <ButtonSeeMore />
                </div>
            </div>
            <hr className="tall" />
        </div>
    );
}

export default SectionClassRoom;