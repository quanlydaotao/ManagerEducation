import React from 'react';
import styles from './styles.css';
import { HomeAdmin } from '../../pages/HomeAdmin';
import { Header } from '../../components/Header';

const PageWrapperAdmin = () => {
    return (
        <React.Fragment>
            <Header />
            <HomeAdmin />
        </React.Fragment>
    );
}

export default PageWrapperAdmin;
