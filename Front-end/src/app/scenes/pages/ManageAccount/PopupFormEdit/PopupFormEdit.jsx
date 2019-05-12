import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import RefreshIcon from '@material-ui/icons/Refresh';
import SaveIcon from '@material-ui/icons/Save';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import styles from './styles.css';
import { connect } from 'react-redux';
import { accountOperations } from '../../../../state/ducks/account';

const style = {
    appBar: {
        position: 'relative',
        backgroundColor: '#455e6b'
    },
    flex: {
        flex: 1,
    },
};

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class PopupFormEdit extends Component {

    render() {
        const { classes, statusForm } = this.props;
        return (
            <div className={`${styles.popupForm}`}>
                <Dialog
                    fullScreen
                    open={true}
                    onClose={this.handleClose}
                    TransitionComponent={Transition}
                >
                    <AppBar className={classes.appBar}>
                        <Toolbar style={{minHeight: 50}}>
                            <IconButton color="inherit" onClick={this.props.closeForm} aria-label="Close">
                                <CloseIcon />
                            </IconButton>
                            <Typography variant="h6" color="inherit" className={classes.flex}>
                                Chỉnh sửa thông tin tài khoản
                            </Typography>
                            <Button color="inherit" onClick={this.handleForm}>
                                <RefreshIcon /> XÓA THÔNG TIN
                            </Button>
                            <Button color="inherit" onClick={this.handleForm} >
                                <SaveIcon/> LƯU THÔNG TIN
                            </Button>
                        </Toolbar>
                    </AppBar>
                    <List>
                        <ListItem button>
                            <ListItemText primary="Phone ringtone" secondary="Titania" />
                        </ListItem>
                        <Divider />
                        <ListItem button>
                            <ListItemText primary="Default notification ringtone" secondary="Tethys" />
                        </ListItem>
                    </List>
                </Dialog>
            </div>
        );
    }
}

PopupFormEdit.propTypes = {
    classes: PropTypes.object.isRequired,
    statusForm: PropTypes.bool.isRequired,
    closeForm: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    statusForm: state.account.toggleEditAccounts,
});

const mapDispatchToProps = {
    closeForm: accountOperations.closeFormEdit
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(PopupFormEdit));