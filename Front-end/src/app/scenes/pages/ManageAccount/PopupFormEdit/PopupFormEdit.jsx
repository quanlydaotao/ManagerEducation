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
import HowToRegIcon from '@material-ui/icons/HowToReg';
import LockIcon from '@material-ui/icons/Lock';
import { accountShape } from '../../../propTypes';
import { fileOperations } from '../../../../state/ducks/file';
import ScreenLockRotationIcon from '@material-ui/icons/ScreenLockRotation';
import PhoneLinkRingIcon from '@material-ui/icons/PhoneLinkRing';
import NaturePeopleIcon from '@material-ui/icons/NaturePeople';
import ContactsIcon from '@material-ui/icons/Contacts';
import Snackbar from '@material-ui/core/Snackbar';
import amber from '@material-ui/core/colors/amber';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import SnackbarContent from '@material-ui/core/SnackbarContent';


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
    snackbar: {
        margin: theme.spacing.unit,
    },
    close: {
        padding: theme.spacing.unit / 2,
    },
    error: {
        backgroundColor: amber[700],
    },
    error1: {
        backgroundColor: theme.palette.error.dark,
    },
    success: {
        backgroundColor: '#338ef9',
    },
    button: {
        margin: theme.spacing.unit,
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    iconSmall: {
        fontSize: 20,
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
    constructor(props) {
        super(props);
        this.state = {
            id: 0, login: '', password: '', re_password: '',
            phoneNumber: '', authorities: [], imageUrl: '',
            firstName: '', lastName: '', email: '',
            image: null, birthday: null, sex: true,
            nations: 'Kinh', address: '', address1: '',
            langKey: 'vi', identityCardNumber: '', activated: true,
            errors: {
                login: '',
                password: '',
                re_password: '',
                phone_number: '',
            },
            imagePreview: '',
            open: false,
            expanded: null
        }
    }

    componentDidMount() {
        const { data } = this.props;
        const {
            id, login, phoneNumber, authorities,
            imageUrl, firstName, lastName, email, birthday, sex, nations,
            address, address1, identityCardNumber, activated
        } = data;
        this.setState({
            id: id, login: login, phoneNumber: phoneNumber, authorities: authorities,
            imageUrl: imageUrl, firstName: firstName, lastName: lastName, email: email,
            birthday: birthday, sex: sex, nations: nations, address: address, address1: address1,
            identityCardNumber: identityCardNumber, activated: activated
        });
    }

    handleOpen = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
    };

    handleChange = event => {
        var target = event.target;
        if (target.name === 'authorities')
            this.setState({ authorities: [target.value] });
        else
            this.setState({ [target.name]: target.value });
    };

    handleChangeFile = event => {
        let reader = new FileReader();
        const file = event.target.files[0];
        reader.onloadend = () => {
            this.setState({
                imageUrl: file.name,
                image: file,
                imagePreview: reader.result
            });
        }
        reader.readAsDataURL(file);

    }

    handleSubmit = event => {
        event.preventDefault();
        this.setState({ open: true });
        const check = this.isErrors(this.state);
        if (check) {
            const {
                id, login, password, re_password, phoneNumber, authorities,
                imageUrl, firstName, lastName, email, birthday, sex, nations,
                address, address1, langKey, identityCardNumber, activated, image
            } = this.state;
            const formData = {
                id, login, password, re_password, phoneNumber, authorities,
                imageUrl, firstName, lastName, email, birthday, sex, nations,
                address, address1, langKey, identityCardNumber, activated, image
            }
            // this.props.addNewUserAccount(formData);
            // if (this.props.actions.status !== "ADD_FAILED") {
            //     if (this.state.image) {
            //         const fd = new FormData();
            //         fd.append('image', this.state.image);
            //         fd.append('dir', 'avatar');
            //         this.props.uploadAvatar(fd);
            //     }
            // }
        }
    }

    handleClose = () => {
        this.setState({ open: false });
    }

    clearData = () => {
        this.setState({ imagePreview: '' });
    }

    isErrors = datas => {
        let login = '';
        let password = '';
        let re_password = '';
        let phone_number = '';
        if (datas.login === '') {
            login = "Mã đăng nhập không được để trống!";
        } else if (!/((AD|PH|GV|HV)+([0-9]{5})\b)/.test(datas.login)) {
            login = "Mã đăng nhập không đúng định dạng!";
        } else {
            login = "";
        }

        if ((datas.password.length > 0 && datas.password.length < 4) || (datas.password.length > 100)) {
            password = "Mật khẩu phải lớn hơn 3 ký tự và bé hơn 101 ký tự!";
        } else {
            password = "";
        }

        if (datas.re_password !== datas.password) {
            re_password = "Mật khẩu nhập lại không khớp!";
        } else {
            re_password = "";
        }

        if (datas.phoneNumber === '') {
            phone_number = "Số điện thoại không được để trống!";
        } else if (!/^(03[2|3|4|5|6|7|8|9]|07[0|6|7|8|9]|08[1|2|3|4|5]|05[6|8|9])[0-9]{7}$/.test(datas.phoneNumber)) {
            phone_number = "Số điện thoại nhập không đúng định dạng! (gồm 10 chữ số và là các số điện thoại của việt nam)";
        } else {
            phone_number = "";
        }

        if (datas.authorities === '') {
            authorities = "Chưa chọn loại tài khoản!";
        } else {
            switch (datas.authorities[0]) {
                case "ROLE_ADMIN":
                    if (datas.login !== '' && datas.login.substring(0, 2) !== 'AD') {
                        login = "Mã đăng nhập không khớp với loại tài khoản ADMIN VD: ADxxxxx!!";
                    } else {
                        login = "";
                    }
                    break;
                case "ROLE_TEACHER":
                    if (datas.login !== '' && datas.login.substring(0, 2) !== 'GV') {
                        login = "Mã đăng nhập không khớp với loại tài khoản GIẢNG VIÊN VD: GVxxxxx!";
                    } else {
                        login = "";
                    }
                    break;
                case "ROLE_PARENTS":
                    if (datas.login !== '' && datas.login.substring(0, 2) !== 'PH') {
                        login = "Mã đăng nhập không khớp với loại tài khoản PHỤ HUYNH VD: PHxxxxx!!";
                    } else {
                        login = "";
                    }
                    break;
                case "ROLE_STUDENT":
                    if (datas.login !== '' && datas.login.substring(0, 2) !== 'HV') {
                        login = "Mã đăng nhập không khớp với loại tài khoản HỌC VIÊN VD: HVxxxxx!!";
                    } else {
                        login = "";
                    }
                    break;
            }
        }
        this.setState({ errors: { login, password, re_password, phone_number } });
        if (login === '' && password === '' && re_password === '' && phone_number === '') {
            return true;
        }
        return false;
    }


    render() {
        const { classes, statusForm, data, actions } = this.props;
        const { expanded, errors, imagePreview } = this.state;
        var isShowMessageBeforeSubit = errors.login !== '' || errors.password !== '' || errors.re_password !== '' || errors.phone_number !== '';
        var isShowMessageFailueAfterSubit = !actions.progress && actions.status === 'ADD_FAILED'
            && actions.data.status === 400 && actions.data.response;
        var isShowMessageSuccessAfterSubit = !actions.progress && actions.status === 'ADD_SUCCESS';
        console.log(this.state);
        let alert = () => {
            if (isShowMessageBeforeSubit || (!isShowMessageBeforeSubit && isShowMessageFailueAfterSubit)) {
                return (
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={this.state.open && (isShowMessageBeforeSubit || isShowMessageFailueAfterSubit)}
                        autoHideDuration={6000}
                        ContentProps={{
                            'aria-describedby': 'message-id',
                        }}
                    >
                        <SnackbarContent
                            className={classes.error}
                            message={
                                <span>
                                    <ul>
                                        {errors.login !== '' ? <li>{errors.login}</li> : ''}
                                        {errors.password !== '' ? <li>{errors.password}</li> : ''}
                                        {errors.re_password !== '' ? <li>{errors.re_password}</li> : ''}
                                        {errors.phone_number !== '' ? <li>{errors.phone_number}</li> : ''}
                                        {(!isShowMessageBeforeSubit && actions.data.status === 400 && actions.data.response) ?
                                            <li>{actions.data.response.createFailed ? actions.data.response.createFailed : 'Đăng ký thất bại!'}</li> : ''}
                                    </ul>
                                </span>
                            }
                            action={[
                                <span>
                                    <IconButton
                                        key="close"
                                        aria-label="Close"
                                        color="inherit"
                                        className={classes.close}
                                        onClick={this.handleClose}
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                </span>
                            ]}
                        />
                    </Snackbar>
                )
            } else if (!isShowMessageBeforeSubit && isShowMessageSuccessAfterSubit) {
                return (
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={this.state.open && !isShowMessageBeforeSubit}
                        autoHideDuration={6000}
                        ContentProps={{
                            'aria-describedby': 'message-id',
                        }}
                    >
                        <SnackbarContent
                            className={classes.success}
                            message={
                                <span>
                                    <ul>
                                        {(!isShowMessageBeforeSubit && isShowMessageSuccessAfterSubit) ? <li>Tạo tài khoản thành công!</li> : ''}
                                    </ul>
                                </span>
                            }
                            action={[
                                <span>
                                    <IconButton
                                        key="close"
                                        aria-label="Close"
                                        color="inherit"
                                        className={classes.close}
                                        onClick={this.handleClose}
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                </span>
                            ]}
                        />
                    </Snackbar>
                )
            }
        }
        return (
            <div>
                {alert()}
                <Dialog
                    fullWidth={true}
                    maxWidth="lg"
                    open={statusForm}
                    onClose={this.props.closeForm}
                    aria-labelledby="draggable-dialog-title"
                >
                    <form onSubmit={this.handleSubmit}>
                        <DialogTitle id="draggable-dialog-title">Chỉnh sửa thông tin tài khoản</DialogTitle>
                        <hr className="tall" />
                        <br />
                        <DialogContent>
                            <DialogContentText style={{ fontSize: '13px' }}>
                                <div className="container bootstrap snippet contentForm">
                                    <div className="row">
                                        <div className="col-sm-3">{/*left col*/}
                                            <div className="avatarUpload">
                                                <img src={imagePreview === '' ? `http://ssl.gstatic.com/accounts/ui/avatar_2x.png` : `${imagePreview}`} className={`${styles.avatar}`} alt="avatar" />
                                                <h6>Upload a different photo...</h6>
                                                <input type="file" id="imageUpload" onChange={this.handleChangeFile} name="imageUrl" accept=".png, .jpg, .jpeg" className="text-center center-block file-upload" /> 
                                            </div><br />
                                            <div className="panel panel-default">
                                                <div className="panel-heading">Thông tin đăng ký <i className="fa fa-link fa-1x" /></div>
                                                <div className="panel-body"><a href="http://bootnipets.com">bootnipets.com</a></div>
                                            </div>
                                            <div className={`${styles.popupForm} ${classes.root}`}>
                                                <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handleOpen('panel1')}>
                                                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                                        <Typography className={classes.secondaryHeading}><ContactsIcon /></Typography>
                                                        <Typography style={{ lineHeight: '27px' }}>Mã đăng nhập (*)</Typography>
                                                    </ExpansionPanelSummary>
                                                    <ExpansionPanelDetails style={{ display: 'block' }}>
                                                        <Typography>
                                                            Mã đăng nhập tối thiểu 7 ký tự trong đó 2 ký tự đầu là mã chức vụ ứng với tài khoản. (<b>Admin</b>: 'ADxxxxx', <b>Giáo viên</b>: 'GVxxxxx', <b>Phụ huynh</b>: 'PHxxxxx' và <b>Học viên</b>: 'HVxxxxx').
                                                        <input type="text" defaultValue={this.state.login} className="mt-1" pattern="(AD|PH|GV|HV)+([0-9]{5})\b" minLength="7" maxLength="50" onChange={this.handleChange} placeholder="Mã đăng nhập..." name="login" required />
                                                        </Typography>
                                                    </ExpansionPanelDetails>
                                                </ExpansionPanel>
                                                <ExpansionPanel expanded={expanded === 'panel2'} onChange={this.handleOpen('panel2')}>
                                                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                                        <Typography className={classes.secondaryHeading}><LockIcon /></Typography>
                                                        <Typography style={{ lineHeight: '27px' }}>
                                                            Mật khẩu
                                                    </Typography>
                                                    </ExpansionPanelSummary>
                                                    <ExpansionPanelDetails>
                                                        <Typography>
                                                            Trường này có thể bỏ trống nếu không muốn thay đổi mật khẩu. Nếu đổi thì mật khẩu phải tối thiểu 4 ký tự và tối đa 100 ký tự.
                                                        <input type="password" autoComplete="false" maxLength="100" onChange={this.handleChange} placeholder="Mật khẩu..." name="password" />
                                                        </Typography>
                                                    </ExpansionPanelDetails>
                                                </ExpansionPanel>
                                                <ExpansionPanel expanded={expanded === 'panel3'} onChange={this.handleOpen('panel3')}>
                                                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                                        <Typography className={classes.secondaryHeading}><ScreenLockRotationIcon /></Typography>
                                                        <Typography style={{ lineHeight: '27px' }}>
                                                            Nhập lại mật khẩu
                                                    </Typography>
                                                    </ExpansionPanelSummary>
                                                    <ExpansionPanelDetails>
                                                        <Typography>
                                                            Trường này có thể bỏ trống nếu không muốn thay đổi mật khẩu. Nếu đổi thì mật khẩu nhập lại phải trùng với mật khẩu đã nhập ở trên.
                                                        <input type="password" autoComplete="false" maxLength="100" onChange={this.handleChange} placeholder="Nhập lại mật khẩu..." name="re_password" />
                                                        </Typography>
                                                    </ExpansionPanelDetails>
                                                </ExpansionPanel>
                                                <ExpansionPanel expanded={expanded === 'panel4'} onChange={this.handleOpen('panel4')}>
                                                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                                        <Typography className={classes.secondaryHeading}><PhoneLinkRingIcon /></Typography>
                                                        <Typography style={{ lineHeight: '27px' }}>
                                                            Số điện thoại (*)
                                                    </Typography>
                                                    </ExpansionPanelSummary>
                                                    <ExpansionPanelDetails>
                                                        <Typography>
                                                            Số điện thoại là số của các nhà mạng ở <b>Việt Nam</b> (số điện thoại bao gồm 10 chữ số).
                                                            <input type="text" defaultValue={this.state.phoneNumber} pattern="^(03[2|3|4|5|6|7|8|9]|07[0|6|7|8|9]|08[1|2|3|4|5]|05[6|8|9])[0-9]{7}$" minLength="10" maxLength="20" onChange={this.handleChange} placeholder="Số điện thoại..." name="phoneNumber" required />
                                                        </Typography>
                                                    </ExpansionPanelDetails>
                                                </ExpansionPanel>
                                                <ExpansionPanel expanded={expanded === 'panel5'} onChange={this.handleOpen('panel5')}>
                                                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                                        <Typography className={classes.secondaryHeading}><NaturePeopleIcon /></Typography>
                                                        <Typography style={{ lineHeight: '27px' }}>
                                                            Loại tài khoản (*)
                                                    </Typography>
                                                    </ExpansionPanelSummary>
                                                    <ExpansionPanelDetails>
                                                        <Typography>
                                                            Với mỗi mã đăng nhập sẽ tương ứng với 1 loại tài khoản. Trong đó, 2 chữ cái đầu tiên của mã đăng nhập sẽ phải trùng
                                                        với loại tài khoản đã chọn. <b>Quản trị viên:</b> ADxxxxx, <b>Giảng viênxxxxx:</b> GVxxxxx, <b>Phụ huynh:</b> PHxxxxx, <b>Học viên:</b> HVxxxxx.
                                                        <select name="authorities" id="role" onChange={this.handleChange} required>
                                                                <option value="">--- Loại tài khoản ---</option>
                                                                <option value="ROLE_ADMIN" selected={this.state.authorities[0] === "ROLE_ADMIN" ? true : false}>Quản trị viên</option>
                                                                <option value="ROLE_TEACHER" selected={this.state.authorities[0] === "ROLE_TEACHER" ? true : false}>Giảng viên</option>
                                                                <option value="ROLE_PARENTS" selected={this.state.authorities[0] === "ROLE_PARENTS" ? true : false}>Phụ huynh</option>
                                                                <option value="ROLE_STUDENT" selected={this.state.authorities[0] === "ROLE_STUDENT" ? true : false}>Học viên</option>
                                                            </select>
                                                        </Typography>
                                                    </ExpansionPanelDetails>
                                                </ExpansionPanel>
                                                <ExpansionPanel expanded={expanded === 'panel6'} onChange={this.handleOpen('panel6')}>
                                                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                                        <Typography className={classes.secondaryHeading}><HowToRegIcon /></Typography>
                                                        <Typography style={{ lineHeight: '27px' }}>
                                                            Trạng thái tài khoản
                                                    </Typography>
                                                    </ExpansionPanelSummary>
                                                    <ExpansionPanelDetails>
                                                        <Typography>
                                                            Tương ứng với mỗi tài khoản sẽ có 2 trạng thái: Kích hoạt và Chưa kích hoạt. Tài khoản chỉ hoạt động được khi đã ở chế độ kích hoạt.
                                                        <select name="activated" onChange={this.handleChange} id="activated" required>
                                                                <option value={true} selected={this.state.activated === true ? true : false}>Kích hoạt</option>
                                                                <option value={false} selected={this.state.activated === false ? true : false}>Chưa kích hoạt</option>
                                                            </select>
                                                        </Typography>
                                                    </ExpansionPanelDetails>
                                                </ExpansionPanel>
                                            </div>
                                        </div>{/*/col-3*/}
                                        <div className="col-sm-9">
                                            <div className="tab-content">
                                                <div className="tab-pane active" id="home">
                                                    <div className="form-group row">
                                                        <div className="col-md-6">
                                                            <label htmlFor="firstName"><b>Họ và tên đệm:</b></label>
                                                            <input type="text" defaultValue={this.state.firstName} maxLength="50" onChange={this.handleChange} placeholder="VD: Đào Huy, Hoàng Ngọc, Hoàng Thị..." name="firstName" />
                                                        </div>
                                                        <div className="col-md-6">
                                                            <label htmlFor="lastName"><b>Tên:</b></label>
                                                            <input type="text" defaultValue={this.state.lastName} maxLength="50" onChange={this.handleChange} placeholder="VD: Đức, Khánh, Hà..." name="lastName" />
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <div className="col-xs-6">
                                                            <label htmlFor="birthday"><b>Ngày sinh:</b></label>
                                                            <input type="date" defaultValue={this.state.birthday} placeholder="VD: 1998-10-02, 1999-08-12" name="birthday" onChange={this.handleChange} />
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <div className="col-xs-6">
                                                            <label htmlFor="sex"><b>Giới tính:</b></label>
                                                            <div className="sex">
                                                                <div class="form-check-inline">
                                                                    <label className="form-check-label">
                                                                        <input type="radio" defaultValue={true} onChange={this.handleChange} className="form-check-input" name="sex" defaultChecked={this.state.sex === true ? true : false} />Nam
                                                                    </label>
                                                                </div>
                                                                <div className="form-check-inline">
                                                                    <label className="form-check-label">
                                                                        <input type="radio" defaultValue={false} onChange={this.handleChange} className="form-check-input" name="sex" defaultChecked={this.state.sex === false ? true : false} />Nữ
                                                                    </label>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <div className="col-md-2">
                                                            <label htmlFor="nations"><b>Dân tộc:</b></label>
                                                            <select name="nations" id="nations" onChange={this.handleChange}>
                                                                <option value="Kinh" selected={this.state.nations === "Kinh" ? true : false}>Kinh</option>
                                                                <option value="Khác" selected={this.state.nations === "Khác" ? true : false}>Khác...</option>
                                                            </select>
                                                        </div>
                                                        <div className="col-md-5">
                                                            <label htmlFor="email"><b>Email:</b></label>
                                                            <input type="email" defaultValue={this.state.email} maxLength="5" maxLength="254" onChange={this.handleChange} placeholder="VD: huyducactvn.edu.vn, huyduc@gmail.com..." name="email" />
                                                        </div>
                                                        <div className="col-md-5">
                                                            <label htmlFor="identity_card_number"><b>Số CMND/CCCD:</b></label>
                                                            <input type="text" defaultValue={this.state.identityCardNumber} onChange={this.handleChange} placeholder="VD: 175077212, 178221981..." name="identityCardNumber" />
                                                        </div>
                                                    </div>

                                                    <div className="form-group row">
                                                        <div className="col-md-12">
                                                            <label htmlFor="address"><b>Hộ khẩu thường trú:</b></label>
                                                            <input type="text" defaultValue={this.state.address} maxLength="254" onChange={this.handleChange} placeholder="VD: 180 Chiến Thắng, Văn Quán, Hà Đông, Hà Nội...." name="address" />
                                                        </div>
                                                        <div className="col-md-12">
                                                            <label htmlFor="address1"><b>Nơi sống hiện tại:</b></label>
                                                            <input type="text" defaultValue={this.state.address1} maxLength="254" onChange={this.handleChange} placeholder="VD: 180 Chiến Thắng, Văn Quán, Hà Đông, Hà Nội...." name="address1" />
                                                        </div>
                                                    </div>
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
                            <Button type="submit" color="primary">
                                Lưu
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </div>
        );
    }
}

PopupFormEdit.propTypes = {
    closeForm: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    accounts: PropTypes.arrayOf(accountShape).isRequired,
    addNewUserAccount: PropTypes.func.isRequired,
    uploadAvatar: PropTypes.func.isRequired,
    actions: PropTypes.objectOf({
        progress: PropTypes.bool.isRequired,
        status: PropTypes.string.isRequired,
        data: PropTypes.object.isRequired
    }).isRequired
};

PopupFormEdit.defaultProps = {
    statusForm: false,
    accounts: [],
    actions: { progress: false, status: '', data: {} },
}

const mapStateToProps = state => ({
    statusForm: state.account.toggleEditAccounts,
    accounts: state.account.accounts,
    actions: state.account.actionsAccounts
});

const mapDispatchToProps = {
    closeForm: accountOperations.closeFormEdit,
    addNewUserAccount: accountOperations.addNewUserAccount,
    uploadAvatar: fileOperations.uploadFile
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(PopupFormEdit));