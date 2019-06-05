import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import StyleIcon from '@material-ui/icons/Style';
import SchoolIcon from '@material-ui/icons/School';
import CastForEducationIcon from '@material-ui/icons/CastForEducation';
import DevicesOtherIcon from '@material-ui/icons/DevicesOther';
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
                    <NavLink to="/admin/edu/years" activeClassName="activeLink">
                        <StyleIcon className={classes.leftIcon} />  NĂM HỌC ĐÀO TẠO
                    </NavLink>
                    <NavLink to="/admin/edu/courses" activeClassName="activeLink">
                        <DevicesOtherIcon className={classes.leftIcon} /> KHÓA ĐÀO TẠO
                    </NavLink>
                    <NavLink to="/admin/edu/classes" activeClassName="activeLink">
                        <CastForEducationIcon className={classes.leftIcon} /> HỆ THỐNG LỚP HỌC
                    </NavLink>
                    <NavLink to="/admin/edu/timetables" activeClassName="activeLink">
                        <SchoolIcon className={classes.leftIcon} /> QUẢN LÝ ĐÀO TẠO/ THỐNG KÊ DỮ LIỆU
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