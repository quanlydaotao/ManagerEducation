import React from 'react';
import styles from './styles.css';
import { TopMenu } from './components/TopMenu';
import { LeftContent } from './components/LeftContent';
import { Widgets } from './components/Widgets';

const VerticalMenuAdmin = () => {
    return (
        <div className={`${styles.VerticalMenu}`}>
            <TopMenu />
            <LeftContent />
            <Widgets />
        </div>
    );
}

export default VerticalMenuAdmin;
