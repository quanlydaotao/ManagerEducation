import React from 'react';
import styles from './styles.css';
import { LeftContent } from './components/LeftContent';

const VerticalMenuAdmin = () => {
    return (
        <div className={`${styles.VerticalMenu}`}>
            <LeftContent />
        </div>
    );
}

export default VerticalMenuAdmin;
