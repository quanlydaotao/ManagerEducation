import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ContactsIcon from '@material-ui/icons/Contacts';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import { NavLink } from 'react-router-dom';

const style = theme => ({
    root: {
        flexGrow: 1
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
});

class TabBars extends React.Component {
 
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <div className="appBar">
                    <NavLink to="/admin/account/list/all" activeClassName="activeLink">
                        <ContactsIcon className={classes.leftIcon}/> DANH SÁCH TÀI KHOẢN ĐĂNG NHẬP
                    </NavLink>
                    <NavLink to="/admin/account/add/new" activeClassName="activeLink">
                        <HowToRegIcon className={classes.leftIcon}/> THÊM MỚI TÀI KHOẢN
                    </NavLink>
                </div>
            </div>
        );
    }
}

TabBars.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(style)(TabBars);