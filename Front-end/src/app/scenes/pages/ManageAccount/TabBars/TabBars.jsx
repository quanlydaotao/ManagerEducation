import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import styles from './styles.css';
import ViewListIcon from '@material-ui/icons/ViewListRounded';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Typography from '@material-ui/core/Typography';
import LazyLoad from 'react-lazyload';
import { NavLink, Route } from 'react-router-dom';
const FormSign = React.lazy(() => import('./components/FormSign/FormSign'));
const EnhancedTableAccount = React.lazy(() => import('./components/EnhancedTableAccount/EnhancedTableAccount'));


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
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
});

class TabBars extends React.Component {
 
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                {/* <AppBar position="static" color="inherit" className={`${styles.HeaderAppBar}`}>
                    <Tabs value={value} onChange={this.handleChange} indicatorColor="inherit">
                        <Tab value="one" icon={<ViewListIcon />} label="DANH SÁCH CHI TIẾT TÀI KHOẢN">
                            
                        </Tab>
                        <Tab value="two" icon={<PersonAddIcon />} label="THÊM MỚI TÀI KHOẢN"/>
                    </Tabs>
                    
                    
                </AppBar> */}
                {/* {value === 'one' && */}
                <div className={`${styles.appBar}`}>
                    <NavLink to="/administrator/account">
                        <ViewListIcon /> DANH SÁCH CHI TIẾT TÀI KHOẢN
                    </NavLink>
                    <NavLink to="/administrator/account/add-new">
                        <PersonAddIcon /> THÊM MỚI TÀI KHOẢN
                    </NavLink>
                </div>
                <hr className="tall" />
                <Route exact path="/administrator/account" render={() => (
                    <LazyLoad>
                        <TabContainer>
                            <Suspense fallback={''}>
                                <EnhancedTableAccount listName="DANH SÁCH QUẢN LÝ ĐĂNG NHẬP HỆ THỐNG" />
                            </Suspense>
                        </TabContainer>
                    </LazyLoad>
                )} />
                {/* } */}
                {/* {value === 'two' && */}
                <Route exact path="/administrator/account/add-new" render={() => (
                    <LazyLoad>
                        <TabContainer>
                            <Suspense fallback={<div>Loading...</div>}>
                                <FormSign />
                            </Suspense>
                        </TabContainer>
                    </LazyLoad>
                )} />
                {/* } */}
            </div>
        );
    }
}

TabBars.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(style)(TabBars);