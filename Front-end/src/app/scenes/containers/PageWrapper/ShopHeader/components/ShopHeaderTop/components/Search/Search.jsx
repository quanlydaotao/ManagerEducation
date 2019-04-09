import React, { Component } from 'react';
import styles from './style.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { searchHeaderOperations } from '../../../../../../../../state/ducks/searchHeader';

class Search extends Component {

    openOrCloseSearch = (status) => {
        if (status)
            this.props.closeSearch();
        else
            this.props.openSearch();
    }

    render() {
        const { isDisplaySearch } = this.props;
        return (
            <li>
                <form action="#" style={{ marginRight: 20 }} className={`${isDisplaySearch ? styles.openForm : styles.closeForm}`}>
                    <input className={`form-control ${styles.searchInput}`} type="search" placeholder="Tìm kiếm sản phẩm" />
                </form>
                <span id="icSearch" onClick={() => this.openOrCloseSearch(isDisplaySearch)}></span>
            </li>
        )
    }
}

Search.PropTypes = {
    isDisplaySearch: PropTypes.bool.isRequired,
    openSearch: PropTypes.func.isRequired,
    closeSearch: PropTypes.func.isRequired
}

Search.defaultProps = {
    isDisplaySearch: false
}

const mapStateToProps = state => ({
    isDisplaySearch: state.searchHeaderReducer
});

const mapDispatchToProps = dispatch => ({
    openSearch: () => {
        dispatch(searchHeaderOperations.openSearchHeader());
    },
    closeSearch: () => {
        dispatch(searchHeaderOperations.closeSearchHeader());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
