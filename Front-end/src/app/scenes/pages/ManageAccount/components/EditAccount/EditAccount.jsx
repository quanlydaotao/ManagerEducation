import React, { Suspense } from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import { connect } from 'react-redux';
import styles from './styles.css';
import { Prompt } from 'react-router-dom';
import { withRouter } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import { locationOperations } from '../../../../../state/ducks/location';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import LockIcon from '@material-ui/icons/Lock';
import ScreenLockRotationIcon from '@material-ui/icons/ScreenLockRotation';
import PhoneLinkRingIcon from '@material-ui/icons/PhonelinkRing';
import NaturePeopleIcon from '@material-ui/icons/NaturePeople';
import ContactsIcon from '@material-ui/icons/Contacts';
import Snackbar from '@material-ui/core/Snackbar';
import amber from '@material-ui/core/colors/amber';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import DocumentTitle from 'react-document-title';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { accountOperations } from '../../../../../state/ducks/account';
import { fileOperations } from '../../../../../state/ducks/file';
const PopupExitPage = React.lazy(() => import('../../../../components/Popup/PopupExitPage/PopupExitPage'));
import { history } from '../../../../../state/utils';


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

class EditAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0, 
            login: '', 
            password: '', 
            re_password: '',
            phoneNumber: '', 
            authorities: [], 
            imageUrl: '',
            firstName: '', 
            lastName: '', 
            email: '',
            image: null, 
            year: '1938',
            month: '01',
            day: '01',
            sex: true,
            nations: 'Kinh',  
            address1: '',
            langKey: 'vi', 
            province: '',
            district: '',
            ward: '',
            identityCardNumber: '', 
            dateIdentityCardNumber: null,
            locationIdentityCardNumber: '',
            activated: true,
            errors: {
                login: '',
                password: '',
                re_password: '',
                phone_number: '',
                authorities: ''
            },
            imagePreview: '',
            open: false,
            isBlocking: false,
            lastLocation: null,
            openExit: false
        }
    }

    componentWillMount() {
        this.setState({ isBlocking: true });
        this.props.findAccountById(this.props.match.params.id);
        this.props.getAllProvince();
    }

    componentDidUpdate(prevProps) {
        if (this.props.detail.id !== prevProps.detail.id) {
            const { detail } = this.props;
            const {
                id, 
                login,
                phoneNumber, 
                authorities,
                imageUrl, 
                firstName, 
                lastName, 
                email, 
                birthday, 
                sex, 
                nations,
                address, 
                address1, 
                dateIdentityCardNumber,
                locationIdentityCardNumber,
                identityCardNumber, 
                activated
            } = detail;
            this.setState({
                id,
                login,
                phoneNumber, 
                authorities,
                imageUrl, 
                firstName, 
                lastName, 
                email,
                birthday,
                dateIdentityCardNumber,
                locationIdentityCardNumber,
                year: birthday.split("-")[0] ? birthday.split("-")[0] : '1938',
                month: birthday.split("-")[1] ? birthday.split("-")[1] : '01',
                day: birthday.split("-")[2] ? birthday.split("-")[2] : '01',
                sex, 
                province: address.split("-")[0] ? address.split("-")[0] : '',
                district: address.split("-")[1] ? address.split("-")[1] : '',
                ward: address.split("-")[2] ? address.split("-")[2] : '',
                nations, 
                address, 
                address1,
                identityCardNumber, 
                activated
            });
            this.props.getDistrictByProvinceId(address.split("-")[0]);
            this.props.getWardByDistrictId(address.split("-")[1]);
        }
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

    handleSelectLocation = event => {
        var target = event.target;
        if (target.name === 'province') {
            this.setState({ province: target.value, district: '', ward: '' });
            this.props.getWardByDistrictId(0);
            this.props.getDistrictByProvinceId(target.value);
        } else if(target.name === 'district') {
            this.setState({ district: target.value, ward: '' });
            this.props.getWardByDistrictId(target.value);
        } else if (target.name === 'ward') {
            this.setState({ ward: target.value });
        }
    }

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
                id, 
                login, 
                password, 
                re_password, 
                phoneNumber, 
                authorities,
                imageUrl, 
                firstName, 
                lastName, 
                email, 
                sex, 
                nations,
                province,
                district,
                ward,
                address1,
                year,
                month,
                day, 
                dateIdentityCardNumber,
                locationIdentityCardNumber,
                langKey, 
                identityCardNumber, 
                activated, 
                image
            } = this.state;
            const formData = {
                id,
                login, 
                password, 
                re_password,
                phoneNumber, 
                authorities,
                imageUrl, 
                firstName, 
                lastName, 
                dateIdentityCardNumber,
                locationIdentityCardNumber,
                email, 
                birthday: year+"-"+month+"-"+day, 
                sex, nations,
                address: province+"-"+district+"-"+ward, 
                address1, 
                langKey, 
                identityCardNumber, 
                activated, 
                image
            }
            this.props.updateAccount(formData);
            if (this.props.status.status !== "UPDATE_FAILED") {
                if (this.state.image) {
                    const fd = new FormData();
                    fd.append('image', this.state.image);
                    fd.append('dir', 'avatar');
                    fd.append('id', id);
                    this.props.updateAvatar(fd);
                }
            }
        }
    }

    handleClose = () => {
        this.setState({ open: false });
    }

    clearData = () => {
        this.setState({ imagePreview: '' });
    }

    isErrors = datas => {
        let login = "";
        let password = "";
        let re_password = "";
        let phone_number = "";
        let authorities = "";
        if (datas.login === "") {
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

        if (datas.phoneNumber === "") {
            phone_number = "Số điện thoại không được để trống!";
        } else if (!/^(03[2|3|4|5|6|7|8|9]|07[0|6|7|8|9]|08[1|2|3|4|5]|05[6|8|9])[0-9]{7}$/.test(datas.phoneNumber)) {
            phone_number = "Số điện thoại nhập không đúng định dạng! (gồm 10 chữ số và là các số điện thoại của việt nam)";
        } else {
            phone_number = "";
        }

        if (datas.authorities === "") {
            authorities = "Chưa chọn loại tài khoản!";
        } else {
            switch (datas.authorities[0]) {
                case "ROLE_ADMIN":
                    if (datas.login !== '' && datas.login.substring(0, 2) !== 'AD') {
                        authorities = "Mã đăng nhập không khớp với loại tài khoản ADMIN VD: ADxxxxx!!";
                    } else {
                        authorities = "";
                    }
                    break;
                case "ROLE_TEACHER":
                    if (datas.login !== '' && datas.login.substring(0, 2) !== 'GV') {
                        authorities = "Mã đăng nhập không khớp với loại tài khoản GIẢNG VIÊN VD: GVxxxxx!";
                    } else {
                        authorities = "";
                    }
                    break;
                case "ROLE_PARENTS":
                    if (datas.login !== '' && datas.login.substring(0, 2) !== 'PH') {
                        authorities = "Mã đăng nhập không khớp với loại tài khoản PHỤ HUYNH VD: PHxxxxx!!";
                    } else {
                        authorities = "";
                    }
                    break;
                case "ROLE_STUDENT":
                    if (datas.login !== '' && datas.login.substring(0, 2) !== 'HV') {
                        authorities = "Mã đăng nhập không khớp với loại tài khoản HỌC VIÊN VD: HVxxxxx!!";
                    } else {
                        authorities = "";
                    }
                    break;
            }
        }
        this.setState({ errors: { login, password, re_password, phone_number, authorities } });
        if (login === '' 
            && password === '' 
            && re_password === '' 
            && phone_number === ''
            && authorities === ''
        ) {
            return true;
        }
        return false;
    }

    handleBlockedNavigation = (lastLocation) => {
       this.setState({ openExit: true, lastLocation });
       return false;
    }

    close = (callback) => this.setState({
               openExit: false
             }, callback);

    confirm = () => this.close(() => {
       const {lastLocation} = this.state;
       if (lastLocation) {
          this.setState({
             openExit: false
          }, () => {  
             history.replace(lastLocation.pathname);
          })
       }
     });
    
    closeFormEdit = () => {
        this.setState({ isBlocking: false });
        history.replace('/admin/account/users');
    }

    render() {
        const { classes, status, provinces, districts, wards } = this.props;
        console.log(this.state);
        const { expanded, errors, imagePreview, isBlocking, openExit, day, month, year, province, district, ward } = this.state;
        var isShowMessageBeforeSubit = errors.login !== '' 
            || errors.password !== '' 
            || errors.re_password !== '' 
            || errors.phone_number !== ''
            || errors.authorities !== '';
        var isShowMessageFailueAfterSubit = !status.progress 
            && status.status === 'UPDATE_FAILED'
            && status.data.status === 400 
            && status.data.response;
        var isShowMessageSuccessAfterSubit = !status.progress 
            && status.status === 'UPDATE_SUCCESS';
        if (isShowMessageSuccessAfterSubit) {
            history.replace('/admin/account/users');
        }
        const optionYear = [];
        const optionMonth = [];
        const optionDay = [];
        for (let i=1938; i<(new Date()).getFullYear(); i++) {
            optionYear.push(<option value={i} selected={i === parseInt(year)}>Năm {i}</option>);
        } 
        for (let i=1; i<=12; i++) {
            optionMonth.push(<option value={i < 10 ? `0${i}` : i} selected={i === parseInt(month)}>{i < 10 ? `Tháng 0${i}` : `Tháng ${i}`}</option>);

        } 
        for (let i=1; i<=31; i++) {
            optionDay.push(<option value={i < 10 ? `0${i}` : i} selected={i === parseInt(day)}>{i < 10 ? `Ngày 0${i}` : `Ngày ${i}`}</option>);
        } 
        let alert = () => {
            if (isShowMessageBeforeSubit 
                || (!isShowMessageBeforeSubit 
                && isShowMessageFailueAfterSubit)
            ) {
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
                                        {errors.authorities !== '' ? <li>{errors.authorities}</li> : ''}
                                        {(!isShowMessageBeforeSubit && status.data.status === 400 && status.data.response) ?
                                            <li>{status.data.response.updateFailed ? status.data.response.updateFailed : 'Đăng ký thất bại!'}</li> : ''}
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
                                        {(!isShowMessageBeforeSubit && isShowMessageSuccessAfterSubit) ? <li>Cập nhật tài khoản thành công!</li> : ''}
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
            <DocumentTitle title=".:Cập nhật tài khoản:.">
                <div>
                    {alert()}
                    <Prompt 
                        when={isBlocking}
                        message={this.handleBlockedNavigation}
                    />
                    <Suspense fallback={''}>
                        <PopupExitPage isShow={openExit} handleClose={this.close} handleConfirm={this.confirm} />
                    </Suspense>
                    <form onSubmit={this.handleSubmit} className={`${styles.formEditAccount}`}>
                        <h4 className="label-title">Chỉnh sửa thông tin tài khoản</h4>
                        <br />
                        <div className="bootstrap snippet contentForm">
                            <div className="row">
                                <div className="col-md-3">
                                    <div className="avatarUpload">
                                        <img src={imagePreview === '' && this.state.imageUrl === '' ? `http://ssl.gstatic.com/accounts/ui/avatar_2x.png` : (`${imagePreview}` || `http://localhost:8080/api/file/avatar/${this.state.imageUrl}`)} className={`${styles.avatar}`} alt="avatar" />
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
                                        <br />
                                    </div>
                                </div>{/*/col-3*/}
                                <div className="col-md-9">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <label htmlFor="firstName"><b>Họ và tên đệm:</b></label>
                                                    <input id="firstName" type="text" maxLength="50" onChange={this.handleChange} placeholder="VD: Đào Huy, Hoàng Ngọc, Hoàng Thị..." name="firstName" defaultValue={this.state.firstName} />
                                                </div>
                                                <div className="col-md-6">
                                                    <label htmlFor="lastName"><b>Tên:</b></label>
                                                    <input id="lastName" type="text" maxLength="50" onChange={this.handleChange} placeholder="VD: Đức, Khánh, Hà..." name="lastName" defaultValue={this.state.lastName} />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-12"><label htmlFor="day"><b>Ngày sinh:</b></label><br/></div>
                                                <div className="col-4">
                                                    <select name="day" id="day" onChange={this.handleChange}>
                                                        { optionDay }
                                                    </select>
                                                </div>
                                                <div className="col-4">
                                                    <select name="month" id="month" onChange={this.handleChange}>
                                                        { optionMonth }
                                                    </select>
                                                </div>
                                                <div className="col-4">
                                                    <select name="year" id="year" onChange={this.handleChange}>
                                                        { optionYear }
                                                    </select>
                                                </div>
                                                
                                                <div className="col-12">
                                                    <label htmlFor="sex"><b>Giới tính:</b></label>
                                                    <div className="sex">
                                                        <div class="form-check-inline">
                                                            <label className="form-check-label">
                                                            <input type="radio" defaultValue={true} onChange={this.handleChange} className="form-check-input" defaultChecked={this.state.sex === true ? true : false} name="sex" />Nam
                                                        </label>
                                                        </div>
                                                        <div className="form-check-inline">
                                                            <label className="form-check-label">
                                                                <input type="radio" defaultValue={false} onChange={this.handleChange} className="form-check-input" defaultChecked={this.state.sex === false ? true : false} name="sex" />Nữ
                                                        </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="row">
                                                <div className="col-3">
                                                    <label htmlFor="nations"><b>Dân tộc:</b></label>
                                                    <select id="nations" name="nations" id="nations" onChange={this.handleChange}>
                                                        <option value="Kinh" selected={this.state.nations === 'Kinh'}>Kinh</option>
                                                        <option value="Khác" selected={this.state.nations === 'Khác'}>Khác...</option>
                                                    </select>
                                                </div>
                                                <div className="col-3">
                                                    <label htmlFor="identity_card_number"><b>Số CMND/CCCD:</b></label>
                                                    <input id="identity_card_number" type="text" onChange={this.handleChange} placeholder="VD: 175077212, 178221981..." name="identityCardNumber" defaultValue={this.state.identityCardNumber} />
                                                </div>
                                                <div className="col-2">
                                                    <label htmlFor="date_card_number"><b>Ngày cấp:</b></label>
                                                    <input id="date_card_number" type="date" onChange={this.handleChange} placeholder="Ngày cấp" name="dateIdentityCardNumber" defaultValue={this.state.dateIdentityCardNumber} />
                                                </div>
                                                <div className="col-4">
                                                    <label htmlFor="locate_card_number"><b>Nơi cấp:</b></label>
                                                    <input id="locate_card_number" type="text" maxLength="100" onChange={this.handleChange} placeholder="VD: CA tỉnh Thanh Hóa..." name="locationIdentityCardNumber" defaultValue={this.state.locationIdentityCardNumber}/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <label htmlFor="email"><b>Email:</b></label>
                                            <input id="email" type="email" maxLength="5" maxLength="254" onChange={this.handleChange} placeholder="VD: huyducactvn.edu.vn, huyduc@gmail.com..." name="email" defaultValue={this.state.email}  />
                                        </div>
                                        <div className="col-md-12">
                                            <label htmlFor="tinh"><b>Quê quán:</b></label>
                                            <div className="row">
                                                <div className="col-3">
                                                    <select name="province" id="tinh" onChange={this.handleSelectLocation}>
                                                        <option value="0">Tỉnh/ Thành phố</option>
                                                        { provinces.map((value, index) => <option key={index} value={value.id} selected={value.id === province}>{value.name}</option>) }
                                                    </select>
                                                </div>
                                                <div className="col-3">
                                                    <select name="district" id="quan" onChange={this.handleSelectLocation}>
                                                        <option value="0">Quận/ Huyện (TX)</option>
                                                        { districts.map((value, index) => <option key={index} value={value.id} selected={value.id === district}>{value.name}</option>) }
                                                    </select>
                                                </div>
                                                <div className="col-6">
                                                    <select name="ward" id="xa" onChange={this.handleSelectLocation}>
                                                        <option value="0">Xã/ Phường/ Thị trấn</option>
                                                        { wards.map((value, index) => <option key={index} value={value.id} selected={value.id === ward}>{value.name}</option>) }
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <label htmlFor="address1"><b>Nơi sống hiện tại:</b></label>
                                            <textarea id="address1" maxLength="254" rows="1" onChange={this.handleChange} placeholder="VD: 180 Chiến Thắng, Văn Quán, Hà Đông, Hà Nội...." name="address1" value={this.state.address1}>
                                                
                                            </textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <Button variant="contained" type="submit" color="primary" className="mr-3">
                                Lưu
                            </Button>
                            <Button onClick={this.closeFormEdit} color="secondary">
                                Hủy bỏ
                            </Button>
                            {status.progress ? 
                                <span style={{ marginLeft: 5, marginTop: 3 }}>
                                    <i class="fa fa-spinner fa-pulse fa-3x fa-fw" 
                                       style={{ fontSize: 30 }}>
                                    </i>
                                </span> : ''}
                        </div>
                    </form>
                </div>
            </DocumentTitle>
        );
    }
}

EditAccount.propTypes = {
    classes: PropTypes.object.isRequired,
    provinces: PropTypes.array.isRequired,
    districts: PropTypes.array.isRequired,
    wards: PropTypes.array.isRequired,
    status: PropTypes.objectOf({
        progress: PropTypes.bool.isRequired,
        status: PropTypes.string.isRequired,
        data: PropTypes.object.isRequired
    }).isRequired,
    detail: PropTypes.object.isRequired,
    updateAccount: PropTypes.func.isRequired,
    updateAvatar: PropTypes.func.isRequired,
    closeFormEdit: PropTypes.func.isRequired,
    getAllProvince: PropTypes.func.isRequired,
    getDistrictByProvinceId: PropTypes.func.isRequired,
    getWardByDistrictId: PropTypes.func.isRequired
};

EditAccount.defaultProps = {
    status: { progress: false, status: '', data: {} },
    detail: {},
    provinces: [],
    districts: [],
    wards: []
}

const mapStateToProps = state => ({
    status: state.account.status,
    detail: state.account.detail,
    provinces: state.location.provinces,
    districts: state.location.districts,
    wards: state.location.wards
});

const mapDispatchToProps = {
    updateAccount: accountOperations.doUpdateAccount,
    updateAvatar: fileOperations.doUpdateFile,
    findAccountById: accountOperations.doGetAccountById,
    getAllProvince: locationOperations.doGetAllProvince,
    getDistrictByProvinceId: locationOperations.doGetDistrictsByProvinceId,
    getWardByDistrictId: locationOperations.doGetWardByDistrictId
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(EditAccount)));