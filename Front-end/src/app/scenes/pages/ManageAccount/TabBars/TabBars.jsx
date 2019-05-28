import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import styles from './styles.css';
import ContactsIcon from '@material-ui/icons/Contacts';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import Typography from '@material-ui/core/Typography';
import LazyLoad from 'react-lazyload';
import { NavLink, Route, Switch } from 'react-router-dom';
const FormSign = React.lazy(() => import('./FormSign/FormSign'));
const EnhancedTableAccount = React.lazy(() => import('./EnhancedTableAccount/EnhancedTableAccount'));


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
                    <NavLink to="/administrator/accounts/users" activeClassName="active">
                        <ContactsIcon /> DANH SÁCH TÀI KHOẢN ĐĂNG NHẬP
                    </NavLink>
                    <NavLink to="/administrator/accounts/add-new" activeClassName="active">
                        <HowToRegIcon /> THÊM MỚI TÀI KHOẢN
                    </NavLink>
                </div>
                <Switch>
                    <Route exact path="/administrator/accounts/users" render={() => (
                        <LazyLoad>
                            <TabContainer>
                                <Suspense fallback={''}>
                                    <EnhancedTableAccount listName="DANH SÁCH QUẢN LÝ ĐĂNG NHẬP HỆ THỐNG" />
                                </Suspense>
                            </TabContainer>
                        </LazyLoad>
                    )} />
                    <Route exact path="/administrator/accounts/add-new" render={() => (
                        <LazyLoad>
                            <TabContainer>
                                <Suspense fallback={<div>Loading...</div>}>
                                    <FormSign />
                                </Suspense>
                            </TabContainer>
                        </LazyLoad>
                    )} />
                </Switch>
            </div>
        );
    }
}

TabBars.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(style)(TabBars);