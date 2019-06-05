import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DraftsIcon from '@material-ui/icons/Drafts';
import HomeIcon from '@material-ui/icons/Home';
import ShopTwoIcon from '@material-ui/icons/ShopTwo';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import FingerPrintIcon from '@material-ui/icons/Fingerprint';
import EuroSymbolIcon from '@material-ui/icons/EuroSymbol';
import ImportantDevicesIcon from '@material-ui/icons/ImportantDevices';
import { NavLink } from 'react-router-dom';
import styles from './styles.css';

const style = theme => ({
    root: {
        width: '100%',
        maxWidth: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing.unit * 4,
    }
});

class LeftContent extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={`${styles.leftContent}`}>
                <List
                    component="nav"
                    subheader={<ListSubheader component="div">TRUNG TÂM NGOẠI NGỮ ALOHA</ListSubheader>}
                    className={classes.root}
                >
                    <ListItem button component={NavLink} to="/admin/home" activeClassName="activeLink">
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText inset primary="Trang chủ" />
                    </ListItem>
                    <ListItem button component={NavLink} to="/admin/edu" activeClassName="activeLink">
                        <ListItemIcon>
                            <ShopTwoIcon />
                        </ListItemIcon>
                        <ListItemText inset primary="Quản lý đào tạo" />
                    </ListItem>
                    <ListItem button component={NavLink} to="/admin/account" activeClassName="activeLink">
                        <ListItemIcon>
                            <AccountBoxIcon />
                        </ListItemIcon>
                        <ListItemText inset primary="Quản lý tài khoản" />
                    </ListItem>
                    <ListItem button component={NavLink} to="/admin/change/password" activeClassName="activeLink">
                        <ListItemIcon>
                            <FingerPrintIcon />
                        </ListItemIcon>
                        <ListItemText inset primary="Thay đổi mật khẩu" />
                    </ListItem>
                    <ListItem button component={NavLink} to="/admin/tuition" activeClassName="activeLink">
                        <ListItemIcon>
                            <EuroSymbolIcon />
                        </ListItemIcon>
                        <ListItemText inset primary="Quản lý học phí" />
                    </ListItem>
                    <ListItem button component={NavLink} to="/admin/message" activeClassName="activeLink">
                        <ListItemIcon>
                            <DraftsIcon />
                        </ListItemIcon>
                        <ListItemText inset primary="Quản lý tin nhắn" />
                    </ListItem>
                    <ListItem button component={NavLink} to="/admin/popup" activeClassName="activeLink">
                        <ListItemIcon>
                            <ImportantDevicesIcon />
                        </ListItemIcon>
                        <ListItemText inset primary="Quản lý Popup" />
                    </ListItem>
                </List>
            </div>
        );
    }
}
LeftContent.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default withStyles(style)(LeftContent);
