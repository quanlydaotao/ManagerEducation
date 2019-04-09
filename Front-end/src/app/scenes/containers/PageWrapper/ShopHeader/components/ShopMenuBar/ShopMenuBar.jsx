import React, { Component } from 'react';
import styles from './style.css';
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { menuOperations } from '../../../../../../state/ducks/menu';
import { menuShape } from '../../../../../propTypes'

const LiMenuItem = styled.li`{
    padding-top: 20px;
    padding-bottom: 20px;
}`

class ShopMenuBar extends Component {
    componentDidMount() {
        if (this.props.menus.length === 0) {
            this.props.fetchListMenu();
        }
    }

    render() {
        const { menus } = this.props;
        let menuItem = menus.map((value, index) => {
            if (value.parentId === 0 && value.status === 1) {
                return (
                    <LiMenuItem key={index}>
                        <NavLink to={value.url} activeStyle={{
                            fontWeight: "bold",
                        }}>{value.name}</NavLink>
                    </LiMenuItem>
                );
            }
        })
        return (
            <div className={`${styles.subMenu}`} style={{ display: 'block' }}>
                <div className="container">
                    <ul className={`${styles.wrapSubMenu}`}>
                        {menuItem}
                    </ul>
                </div>
            </div>
        );
    }
}

ShopMenuBar.PropTypes = {
    menus: PropTypes.arrayOf(menuShape),
    fetchListMenu: PropTypes.func.isRequired
};

ShopMenuBar.defaultProps = {
    menus: [],
};

const mapStateToProps = state => ({
    menus: state.menuReducer,
});

const mapDispatchToProps = {
    fetchListMenu: menuOperations.fetchListMenu,
};

export default connect(mapStateToProps, mapDispatchToProps)(ShopMenuBar);

