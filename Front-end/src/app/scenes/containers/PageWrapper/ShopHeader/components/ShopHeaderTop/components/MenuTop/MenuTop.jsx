import React, { Component } from 'react';
import styles from './style.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { toggleMenuOperations } from '../../../../../../../../state/ducks/toggleMenu';


const IconMenu = styled.span`{
    display: inline-block;
    margin-top: 1px; 
    width: 15px;
    height: 15px;
    background-repeat: no-repeat;
    background-size: cover;
}`

class MenuTop extends Component {

    openOrCloseMenu = (status) => {
        if (status) 
            this.props.closeMenu();
        else 
            this.props.openMenu();
    }

    render() {
        const { menuStatus } = this.props;
        return (
            <React.Fragment>
                <li>
                    <IconMenu className={`${menuStatus ? styles.icon_menuBar : styles.icon_menuClose}`}
                        onClick={() => this.openOrCloseMenu(menuStatus)}>
                    </IconMenu>
                </li>
                <li>
                    <span style={{ color: '#313132', fontWeight: 700 }}>{menuStatus ? 'MENU' : 'CLOSE'}</span>
                </li>
            </React.Fragment>
        )
    }
}

MenuTop.PropTypes = {
    menuStatus: PropTypes.bool.isRequired,
    openMenu: PropTypes.func.isRequired,
    closeMenu: PropTypes.func.isRequired
}

MenuTop.defaultProps = {
    menuStatus: false
}

const mapStateToProps = state => ({
    menuStatus: state.toggleMenuReducer
});

const mapDispathToProps = dispatch => ({
    openMenu: () => {
        dispatch(toggleMenuOperations.openMenuBar());
    },
    closeMenu: () => {
        dispatch(toggleMenuOperations.closeMenuBar());
    }
});

export default connect(mapStateToProps, mapDispathToProps)(MenuTop);