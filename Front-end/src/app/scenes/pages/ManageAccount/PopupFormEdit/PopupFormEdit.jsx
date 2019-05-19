import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import { accountOperations } from '../../../../state/ducks/account';
import Draggable from 'react-draggable';
import { connect } from 'react-redux';
import styles from './styles.css';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import HowToRegIcon from '@material-ui/icons/HowToReg'
import LockIcon from '@material-ui/icons/Lock'
import ScreenLockRotationIcon from '@material-ui/icons/ScreenLockRotation';
import PhoneLinkRingIcon from '@material-ui/icons/PhoneLinkRing';
import NaturePeopleIcon from '@material-ui/icons/NaturePeople';
import ContactsIcon from '@material-ui/icons/Contacts';


const style = theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        marginRight: '10px',
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
});

function PaperComponent(props) {
    return (
        <Draggable>
            <Paper {...props} />
        </Draggable>
    );
}

class PopupFormEdit extends React.Component {
    state = {
        expanded: null,
    };

    handleChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { statusForm, data } = this.props;
        const { classes } = this.props;
        const { expanded } = this.state;

        return (
            <div>
                <Dialog
                    fullWidth={true}
                    maxWidth="lg"
                    open={statusForm}
                    onClose={this.props.closeForm}
                    PaperComponent={PaperComponent}
                    aria-labelledby="draggable-dialog-title"
                >
                    <DialogTitle id="draggable-dialog-title">Chỉnh sửa thông tin tài khoản</DialogTitle>
                    <hr className="tall" />
                    <br />
                    <DialogContent>
                        <DialogContentText style={{fontSize: '13px'}}>
                            <div className="container bootstrap snippet contentForm">
                                <div className="row">
                                    <div className="col-sm-3">{/*left col*/}
                                        <div>
                                            <img src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png" className="avatar img-circle img-thumbnail" alt="avatar" />
                                            <h6>Upload a different photo...</h6>
                                            <input type="file" className="text-center center-block file-upload" />
                                        </div><br />
                                        <div className="panel panel-default">
                                            <div className="panel-heading">Thông tin đăng ký <i className="fa fa-link fa-1x" /></div>
                                            <div className="panel-body"><a href="http://bootnipets.com">bootnipets.com</a></div>
                                        </div>
                                        <div className={`${styles.popupForm} ${classes.root}`}>
                                            <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}>
                                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                                    <Typography className={classes.secondaryHeading}><ContactsIcon /></Typography>
                                                    <Typography style={{lineHeight: '27px'}}>Mã đăng nhập (*)</Typography>
                                                </ExpansionPanelSummary>
                                                <ExpansionPanelDetails>
                                                    <Typography>
                                                        Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget
                                                        maximus est, id dignissim quam.
                                                    </Typography>
                                                </ExpansionPanelDetails>
                                            </ExpansionPanel>
                                            <ExpansionPanel expanded={expanded === 'panel2'} onChange={this.handleChange('panel2')}>
                                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                                    <Typography className={classes.secondaryHeading}><LockIcon /></Typography>
                                                    <Typography style={{lineHeight: '27px'}}>
                                                        Mật khẩu
                                                    </Typography>
                                                </ExpansionPanelSummary>
                                                <ExpansionPanelDetails>
                                                    <Typography>
                                                        Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus, varius pulvinar
                                                        diam eros in elit. Pellentesque convallis laoreet laoreet.
                                                    </Typography>
                                                </ExpansionPanelDetails>
                                            </ExpansionPanel>
                                            <ExpansionPanel expanded={expanded === 'panel3'} onChange={this.handleChange('panel3')}>
                                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                                    <Typography className={classes.secondaryHeading}><ScreenLockRotationIcon /></Typography>
                                                    <Typography style={{lineHeight: '27px'}}>
                                                        Nhập lại mật khẩu
                                                    </Typography>
                                                </ExpansionPanelSummary>
                                                <ExpansionPanelDetails>
                                                    <Typography>
                                                        Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas
                                                        eros, vitae egestas augue. Duis vel est augue.
                                                    </Typography>
                                                </ExpansionPanelDetails>
                                            </ExpansionPanel>
                                            <ExpansionPanel expanded={expanded === 'panel4'} onChange={this.handleChange('panel4')}>
                                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                                    <Typography className={classes.secondaryHeading}><PhoneLinkRingIcon /></Typography>
                                                    <Typography style={{lineHeight: '27px'}}>
                                                        Số điện thoại (*)
                                                    </Typography>
                                                </ExpansionPanelSummary>
                                                <ExpansionPanelDetails>
                                                    <Typography>
                                                        Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas
                                                        eros, vitae egestas augue. Duis vel est augue.
                                                    </Typography>
                                                </ExpansionPanelDetails>
                                            </ExpansionPanel>
                                            <ExpansionPanel expanded={expanded === 'panel5'} onChange={this.handleChange('panel5')}>
                                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                                    <Typography className={classes.secondaryHeading}><NaturePeopleIcon /></Typography>
                                                    <Typography style={{lineHeight: '27px'}}>
                                                        Chức vụ tài khoản (*)
                                                    </Typography>
                                                </ExpansionPanelSummary>
                                                <ExpansionPanelDetails>
                                                    <Typography>
                                                        Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas
                                                        eros, vitae egestas augue. Duis vel est augue.
                                                    </Typography>
                                                </ExpansionPanelDetails>
                                            </ExpansionPanel>
                                            <ExpansionPanel expanded={expanded === 'panel6'} onChange={this.handleChange('panel6')}>
                                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                                    <Typography className={classes.secondaryHeading}><HowToRegIcon /></Typography>
                                                    <Typography style={{lineHeight: '27px'}}>
                                                        Trạng thái tài khoản
                                                    </Typography>
                                                </ExpansionPanelSummary>
                                                <ExpansionPanelDetails>
                                                    <Typography>
                                                        Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas
                                                        eros, vitae egestas augue. Duis vel est augue.
                                                    </Typography>
                                                </ExpansionPanelDetails>
                                            </ExpansionPanel>
                                        </div>
                                    </div>{/*/col-3*/}
                                    <div className="col-sm-9">
                                        <div className="tab-content">
                                            <div className="tab-pane active" id="home">
                                                <form className="form">
                                                    <div className="form-group">
                                                        <div className="col-xs-6">
                                                            <label htmlFor="firstName"><b>Họ:</b></label>
                                                            <input type="text" maxLength="50" onChange={this.handleChange} placeholder="VD: Đào Huy, Hoàng Ngọc, Hoàng Thị..." name="firstName" />
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <div className="col-xs-6">
                                                            <label htmlFor="lastName"><b>Tên:</b></label>
                                                            <input type="text" maxLength="50" onChange={this.handleChange} placeholder="VD: Đức, Khánh, Hà..." name="lastName" />
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <div className="col-xs-6">
                                                            <label htmlFor="birthday"><b>Ngày sinh:</b></label>
                                                            <input type="date" placeholder="VD: 1998-10-02, 1999-08-12" name="birthday" onChange={this.handleChange} />
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <div className="col-xs-6">
                                                            <label htmlFor="sex"><b>Giới tính:</b></label>
                                                            <div className="sex">
                                                                <div class="form-check-inline">
                                                                    <label className="form-check-label">
                                                                        <input type="radio" value={true} onChange={this.handleChange} className="form-check-input" name="sex" checked />Nam
                                                                    </label>
                                                                </div>
                                                                <div className="form-check-inline">
                                                                    <label className="form-check-label">
                                                                        <input type="radio" value={false} onChange={this.handleChange} className="form-check-input" name="sex" />Nữ
                                                                    </label>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <div className="col-xs-6">
                                                            <label htmlFor="nations"><b>Dân tộc:</b></label>
                                                            <select name="nations" id="nations" onChange={this.handleChange}>
                                                                <option value="Kinh">Kinh</option>
                                                                <option value="Khác">Khác...</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <div className="col-xs-6">
                                                            <label htmlFor="email"><b>Email:</b></label>
                                                            <input type="email" maxLength="5" maxLength="254" onChange={this.handleChange} placeholder="VD: huyducactvn.edu.vn, huyduc@gmail.com..." name="email" />
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <div className="col-xs-6">
                                                            <label htmlFor="identity_card_number"><b>Số CMND/CCCD:</b></label>
                                                            <input type="text" onChange={this.handleChange} placeholder="VD: 175077212, 178221981..." name="identityCardNumber" />
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <div className="col-xs-6">
                                                            <label htmlFor="address"><b>Hộ khẩu thường trú:</b></label>
                                                            <input type="text" maxLength="254" onChange={this.handleChange} placeholder="VD: 180 Chiến Thắng, Văn Quán, Hà Đông, Hà Nội...." name="address" />
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <div className="col-xs-6">
                                                            <label htmlFor="address1"><b>Nơi sống hiện tại:</b></label>
                                                            <input type="text" maxLength="254" onChange={this.handleChange} placeholder="VD: 180 Chiến Thắng, Văn Quán, Hà Đông, Hà Nội...." name="address1" />
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <div className="col-xs-12">
                                                            <br />
                                                            <button className="btn btn-lg btn-success" type="submit"><i className="glyphicon glyphicon-ok-sign" /> Save</button>
                                                            <button className="btn btn-lg" type="reset"><i className="glyphicon glyphicon-repeat" /> Reset</button>
                                                        </div>
                                                    </div>
                                                </form>
                                                <hr />
                                            </div>{/*/tab-pane*/}
                                        </div>{/*/tab-pane*/}
                                    </div>{/*/tab-content*/}
                                </div>{/*/col-9*/}
                            </div>{/*/row*/}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.closeForm} color="primary">
                            Thoát
                        </Button>
                        <Button onClick={this.handleClose} color="primary">
                            Lưu
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

PopupFormEdit.propTypes = {
    closeForm: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
};

PopupFormEdit.defaultProps = {
    statusForm: false
}

const mapStateToProps = state => ({
    statusForm: state.account.toggleEditAccounts
});

const mapDispatchToProps = {
    closeForm: accountOperations.closeFormEdit
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(PopupFormEdit));