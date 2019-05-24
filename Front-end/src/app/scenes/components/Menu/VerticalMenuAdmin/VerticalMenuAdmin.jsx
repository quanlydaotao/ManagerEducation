import React from 'react';
import styles from './styles.css';
import { TopMenu } from './components/TopMenu';
import { LeftContent } from './components/LeftContent';

const VerticalMenuAdmin = () => {
    return (
        <div className={`${styles.VerticalMenu}`}>
            <TopMenu />
            <LeftContent />
        </div>
    );
}

export default VerticalMenuAdmin;
