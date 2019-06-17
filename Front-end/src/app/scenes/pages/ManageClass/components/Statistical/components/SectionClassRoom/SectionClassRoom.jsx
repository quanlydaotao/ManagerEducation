import React from 'react';
import styles from './styles.css';
import { LabelYears } from './components/LabelYears';
import { CardClass } from './components/CardClass';
import { ButtonSeeMore } from '../../../../../../components/Buttons/ButtonSeeMore';

const SectionClassRoom = (props) => {
    const { year, clas } = props;
    return (
        <div className={`${styles.secctionClassRoom}`}>
            <LabelYears title={year.startYears} timeOpen={year.openDay} />
            <div className={`${styles.mainSection}`}>
                <div className="row">
                    { clas.map((value, index) => {
                        return (
                            <div key={index} className={`col-md-4 ${styles.mgBt}`}>
                                <CardClass data={value}/>
                            </div>
                        )
                    }) }
                </div>
            </div>
            <hr className="tall" />
        </div>
    );
}

export default SectionClassRoom;