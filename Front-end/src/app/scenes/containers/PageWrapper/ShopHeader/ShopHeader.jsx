import React, {  Suspense } from 'react';
import styles from './style.css';
import PropTypes from 'prop-types';
import { ShopHeaderTop } from './components/ShopHeaderTop';
import { connect } from 'react-redux';
const ShopMenuBar = React.lazy(() => import('./components/ShopMenuBar/ShopMenuBar'));


const ShopHeader = ({ menuStatus }) => {
    return (
        <header className={`${styles.headerMain} ${styles.sticky}`}>
            <ShopHeaderTop />
            <Suspense fallback="">
                {!menuStatus ? <ShopMenuBar /> : ''}
            </Suspense>
        </header>
    );
}

ShopHeader.PropTypes = {
    menuStatus : PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
    menuStatus: state.toggleMenuReducer
});

export default connect(mapStateToProps, null)(ShopHeader);