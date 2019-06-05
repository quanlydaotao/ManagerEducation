import React, { Component } from 'react';
import styles from './styles.css';
import { LabelYears } from './components/LabelYears';
import { CardClass } from './components/CardClass';
import { ButtonSeeMore } from '../../../components/Buttons/ButtonSeeMore';

class SectionClassRoom extends Component {
    render() {
        return (
            <div className={`${styles.secctionClassRoom}`}>
                <LabelYears />
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
                    <div align="center" style={{marginBottom: 30}}>
                        <ButtonSeeMore />
                    </div>
                </div>
                <hr className="tall"/>
            </div>
        );
    }
}

export default SectionClassRoom;