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
import { NavLink, Route } from 'react-router-dom';
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
                    <NavLink to="/administrator/class">
                        <StyleIcon/> QUẢN LÝ NĂM HỌC
                    </NavLink>
                    <NavLink to="/administrator/class/list">
                        <CastForEducationIcon /> DANH SÁCH LỚP HỌC
                    </NavLink>
                    <NavLink to="/administrator/class/add-new">
                        <AddToPhotosIcon /> THÊM MỚI LỚP HỌC
                    </NavLink>
                </div>
                <Route exact path="/administrator/class" render={() => (
                    <LazyLoad>
                        <TabContainer>
                            <Suspense fallback={''}>
                                <EnhancedTableYear listName="DANH SÁCH NĂM HỌC" />
                            </Suspense>
                        </TabContainer>
                    </LazyLoad>
                )} />
                <Route exact path="/administrator/class/add-new" render={() => (
                    <LazyLoad>
                        <TabContainer>
                            <Suspense fallback={<div>Loading...</div>}>
                                 {/*<FormSign />*/}
                            </Suspense>
                        </TabContainer>
                    </LazyLoad>
                )} />
            </div>
        );
    }
}

TabBars.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(style)(TabBars);