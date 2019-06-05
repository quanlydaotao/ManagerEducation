import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import styles from './styles.css';
import StyleIcon from '@material-ui/icons/Style';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import SchoolIcon from '@material-ui/icons/School';
import CastForEducationIcon from '@material-ui/icons/CastForEducation';
import DevicesOtherIcon from '@material-ui/icons/DevicesOther';
import Typography from '@material-ui/core/Typography';
import LazyLoad from 'react-lazyload';
import { NavLink, Route, Redirect, Switch } from 'react-router-dom';
const Years = React.lazy(() => import('./Years/Years'));
const Class = React.lazy(() => import('./Class/Class'));

function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 0 }}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

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
                        <StyleIcon className={classes.leftIcon}/>  NĂM HỌC ĐÀO TẠO
                    </NavLink>
                    <NavLink to="/admin/edu/courses" activeClassName="activeLink">
                        <DevicesOtherIcon className={classes.leftIcon}/> KHÓA ĐÀO TẠO
                    </NavLink>
                    <NavLink to="/admin/edu/classes" activeClassName="activeLink">
                        <CastForEducationIcon className={classes.leftIcon}/> HỆ THỐNG LỚP HỌC
                    </NavLink>
                    <NavLink to="/admin/edu/timetables" activeClassName="activeLink">
                        <SchoolIcon className={classes.leftIcon}/> QUẢN LÝ ĐÀO TẠO/ THỐNG KÊ DỮ LIỆU
                    </NavLink>
                </div>
                <Switch>
                    
                    {/* Render the wrapper years page if the url is "/administrator/education/years" */}
                    <Route 
                        exact
                        path="/admin/edu/years" 
                        render={() => (
                            <LazyLoad>
                                <TabContainer>
                                    <Suspense fallback={''}>
                                        <Years />
                                    </Suspense>
                                </TabContainer>
                            </LazyLoad>
                        )} 
                    />
                    {/* Render the add new class page if the url is "/administrator/education/classes" */}
                    <Route 
                        path="/admin/edu/classes" 
                        render={() => (
                            <LazyLoad>
                                <TabContainer>
                                    <Suspense fallback={<div>Loading...</div>}>
                                        <Class />
                                    </Suspense>
                                </TabContainer>
                            </LazyLoad>
                        )} 
                    />
                    {/* Render the add new class page if the url is "/administrator/education/classes/add-new" */}
                    <Route 
                        exact 
                        path="/admin/edu/courses" 
                        render={() => (
                            <LazyLoad>
                                <TabContainer>
                                    <Suspense fallback={<div>Loading...</div>}>
                                        <div>Add new class</div>
                                    </Suspense>
                                </TabContainer>
                            </LazyLoad>
                        )} 
                    />
                </Switch>
            </div>
        );
    }
}

TabBars.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(style)(TabBars);