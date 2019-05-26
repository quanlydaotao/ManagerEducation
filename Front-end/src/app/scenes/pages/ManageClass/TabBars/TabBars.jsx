import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import styles from './styles.css';
import StyleIcon from '@material-ui/icons/Style';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import CastForEducationIcon from '@material-ui/icons/CastForEducation';
import Typography from '@material-ui/core/Typography';
import LazyLoad from 'react-lazyload';
import { NavLink, Route, Redirect, Switch } from 'react-router-dom';
const EnhancedTableYear = React.lazy(() => import('./EnhancedTableYear/EnhancedTableYear'));

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
});

class TabBars extends React.Component {

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <div className={`${styles.appBar}`}>
                    <NavLink to="/administrator/class/years">
                        <StyleIcon /> QUẢN LÝ NĂM HỌC
                    </NavLink>
                    <NavLink to="/administrator/class/list-classes">
                        <CastForEducationIcon /> DANH SÁCH LỚP HỌC
                    </NavLink>
                    <NavLink to="/administrator/class/add-new-classes">
                        <AddToPhotosIcon /> THÊM MỚI LỚP HỌC
                    </NavLink>
                </div>
                <Switch>
                    {/* Redirect the list years page if the url is "/administrator/class" */}
                    <Route 
                        exact 
                        path="/administrator/class" 
                        render={() => (
                            <Redirect to="/administrator/class/years" />
                        )}
                    />
                    
                    {/* Render the wrapper years page if the url is "/administrator/class" */}
                    <Route 
                        path="/administrator/class/years" 
                        render={() => (
                            <LazyLoad>
                                <TabContainer>
                                    <Suspense fallback={''}>
                                        <EnhancedTableYear listName="DANH SÁCH TẤT CẢ CÁC NĂM HỌC" />
                                    </Suspense>
                                </TabContainer>
                            </LazyLoad>
                        )} 
                    />

                    {/* Render the add new class page if the url is "/administrator/class/add-new" */}
                    <Route 
                        exact 
                        path="/administrator/class/add-new" 
                        render={() => (
                            <LazyLoad>
                                <TabContainer>
                                    <Suspense fallback={<div>Loading...</div>}>
                                        {/*<FormSign />*/}
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