import React from 'react';
import styles from './styles.css';
import { FormPanel } from './components/FormPanel';
import { DescriptionPanel } from './components/DescriptionPanel';

const Panel = () => {
    return (
        <div className={`${styles.panel}`}>
            <div className={`row ${styles.wrapPanel} clearfix`}>
                <div className="col-md-5">
                    <FormPanel />
                </div>
                <div className="col-md-7">
                    <DescriptionPanel />
                </div>
            </div>
        </div>
    );
}

export default Panel;
