import React, { Component, Suspense } from 'react';
import styles from './styles.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { accountShape } from '../../../../propTypes';
import { accountOperations } from '../../../../../state/ducks/account';
import { fileOperations } from '../../../../../state/ducks/file';
import Snackbar from '@material-ui/core/Snackbar';
import { withStyles } from '@material-ui/core/styles';
import amber from '@material-ui/core/colors/amber';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import DocumentTitle from 'react-document-title';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { Prompt } from 'react-router-dom';
import { withRouter } from 'react-router';
import { history } from '../../../../../state/utils';
const PopupExitPage = React.lazy(() => import('../../../../components/Popup/PopupExitPage/PopupExitPage'));
const style = theme => ({
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
        fontSize: 12,
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

class FormSign extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
            birthday: null, 
            sex: true,
            nations: 'Kinh', 
            address: '', 
            address1: '',
            langKey: 'vi', 
            identityCardNumber: '', 
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

    handleClose = () => {
        this.setState({ open: false });
    }

    clearData = () => {
        this.setState({ imagePreview: '' });
    }

    handleChange = event => {
        this.setState({ isBlocking: true });
        var target = event.target;
        if (target.name === 'authorities')
            this.setState({ authorities: [target.value] });
        else
            this.setState({ [target.name]: target.value });
    };

    handleChangeFile = event => {
        this.setState({ isBlocking: true });
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
        const isErrors = this.isErrors(this.state);
        const { status } = this.props;
        if (isErrors) {
            const {
                login, 
                password, 
                re_password, 
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
                langKey, 
                identityCardNumber, 
                activated, 
                image
            } = this.state;

            const formData = {
                login, 
                password, 
                re_password,
                phoneNumber, 
                authorities,
                imageUrl, 
                firstName, 
                lastName, 
                email, 
                birthday, 
                sex, nations,
                address, 
                address1, 
                langKey, 
                identityCardNumber, 
                activated, 
                image
            }
            this.props.createNewUserAccount(formData);
            if (status !== "ADD_FAILED") {
                if (this.state.image) {
                    const fd = new FormData();
                    fd.append('image', this.state.image);
                    fd.append('dir', 'avatar');
                    this.props.uploadAvatar(fd);
                }
            }
        }
    }

    isErrors = datas => {
        let login = "";
        let password = "";
        let re_password = "";
        let phone_number = "";
        let authorities = ""
        if (datas.login === "") {
            login = "Mã đăng nhập không được để trống!";
        } else if (!/((AD|PH|GV|HV)+([0-9]{5})\b)/.test(datas.login)) {
            login = "Mã đăng nhập không đúng định dạng!";
        } else {
            login = "";
        }

        if (datas.password === "") {
            password = "Mật khẩu không được để trống!";
        } else if ((datas.password.length < 4) || (datas.password.length > 100)) {
            password = "Mật khẩu phải lớn hơn 3 ký tự và bé hơn 101 ký tự!";
        } else {
            password = "";
        }

        if (datas.re_password === "") {
            re_password = "Mật khẩu nhập lại không được để trống!";
        } else if (datas.re_password !== datas.password) {
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

        if (datas.authorities === '') {
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
        this.setState({ errors: { login, password, re_password, phone_number, authorities} });
        if (login === '' && password === '' && re_password === '' && phone_number === '' && authorities === '') {
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
             history.push(lastLocation.pathname);
          })
       }
     });

    render() {
        const { classes, status } = this.props;
        const { errors, imagePreview, isBlocking, openExit } = this.state;
        var isShowMessageBeforeSubit = errors.login !== '' 
            || errors.password !== '' 
            || errors.re_password !== '' 
            || errors.phone_number !== ''
            || errors.authorities !== '';
        var isShowMessageFailueAfterSubit = !status.progress 
            && status.status === 'ADD_FAILED'
            && status.data.status === 400 
            && status.data.response;
        var isShowMessageSuccessAfterSubit = !status.progress 
            && status.status === 'ADD_SUCCESS';
        if (isShowMessageSuccessAfterSubit) {
            history.push('/admin/account/users');
        }
        let alert = () => {
            if (isShowMessageBeforeSubit || (!isShowMessageBeforeSubit && isShowMessageFailueAfterSubit)) {
                return (
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={this.state.open 
                            && (isShowMessageBeforeSubit 
                            || isShowMessageFailueAfterSubit)}
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
                                            <li>{status.data.response.createFailed ? status.data.response.createFailed : 'Đăng ký thất bại!'}</li> : ''}
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
                        open={this.state.open 
                            && !isShowMessageBeforeSubit}
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
            <DocumentTitle title=".:Thêm mới tài khoản:.">
                <div className={`${styles.formSign}`}>
                    <Prompt 
                        when={isBlocking}
                        message={this.handleBlockedNavigation}
                    />
                    <Suspense fallback={''}>
                        <PopupExitPage isShow={openExit} handleClose={this.close} handleConfirm={this.confirm} />
                    </Suspense>
                    {alert()}
                    <h3>Đăng ký tài khoản đăng nhập hệ thống</h3>
                    <div>
                        <div><b>Chú ý:</b></div>
                        <ul className="attention">
                            <li>- Các trường thông tin đánh dấu <b>(*)</b> ở dưới là bắt buộc.</li>
                            <li>- Mã đăng nhập tối thiểu 7 ký tự trong đó 2 ký tự đầu là mã chức vụ ứng với tài khoản. (<b>Admin</b>: 'ADxxxxx', <b>Giáo viên</b>: 'GVxxxxx', <b>Phụ huynh</b>: 'PHxxxxx' và <b>Học viên</b>: 'HVxxxxx').</li>
                            <li>- Mật khẩu tối thiểu 4 ký tự và tối đa 100 ký tự.</li>
                            <li>- Số điện thoại là số của các nhà mạng ở <b>Việt Nam</b> (số điện thoại bao gồm 10 chữ số).</li>
                            <li>- Với mỗi mã đăng nhập sẽ tương ứng với 1 loại tài khoản. Trong đó, 2 chữ cái đầu tiên của mã đăng nhập sẽ phải trùng với loại tài khoản đã chọn..</li>
                        </ul>
                    </div>
                    <div className="contentForm">
                        <form onSubmit={this.handleSubmit} encType="multipart/form-data">
                            <div className="row">
                                <div className="col-md-4">
                                    <h2 className="titleForm">Thông tin đăng ký tài khoản ( Bắt buộc )</h2>
                                    <label htmlFor="login"><b>Mã đăng nhập: (*)</b></label>
                                    <input type="text" pattern="(AD|PH|GV|HV)+([0-9]{5})\b" minLength="7" maxLength="50" onChange={this.handleChange} placeholder="VD: AD88901, GV67834, PH09813, HV00001..." name="login" required />
                                    <label htmlFor="password"><b>Mật khẩu: (*)</b></label>
                                    <input type="password" autoComplete="false" minLength="4" maxLength="100" onChange={this.handleChange} placeholder="VD: Meocon123, Abc@1234..." name="password" required />
                                    <label htmlFor="re_password"><b>Nhập lại mật khẩu: (*)</b></label>
                                    <input type="password" autoComplete="false" minLength="4" maxLength="100" onChange={this.handleChange} placeholder="Nhập lại mật khẩu..." name="re_password" required />
                                    <label htmlFor="phone_number"><b>Nhập số điện thoại: (*)</b></label>
                                    <input type="text" pattern="^(03[2|3|4|5|6|7|8|9]|07[0|6|7|8|9]|08[1|2|3|4|5]|05[6|8|9])[0-9]{7}$" minLength="10" maxLength="20" onChange={this.handleChange} placeholder="VD: 0363205500, 0984610934..." name="phoneNumber" required />
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label htmlFor="authorities"><b>Loại tài khoản: (*)</b></label>
                                            <select name="authorities" id="role" onChange={this.handleChange} required>
                                                <option value="">--- Loại tài khoản ---</option>
                                                <option value="ROLE_ADMIN">Quản trị viên</option>
                                                <option value="ROLE_TEACHER">Giảng viên</option>
                                                <option value="ROLE_PARENTS">Phụ huynh</option>
                                                <option value="ROLE_STUDENT">Học viên</option>
                                            </select>
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="activated"><b>Trạng thái:</b></label>
                                            <select name="activated" onChange={this.handleChange} id="activated" required>
                                                <option value={true}>Kích hoạt</option>
                                                <option value={false}>Chưa kích hoạt</option>
                                            </select>
                                        </div>
                                    </div>
                                    <p>By creating an account you agree to our <a href="#" style={{ color: 'dodgerblue' }}>Terms &amp; Privacy</a>.</p>
                                    <div className="clearfix">
                                        <Button variant="contained" type="submit" style={{backgroundColor: '#425e6e', color: '#fff'}} className={`reset-button ${classes.button}`}>
                                            ĐĂNG KÝ
                                            <PersonAddIcon className={classes.rightIcon} />
                                        </Button>
                                        {status.progress ? <span style={{ marginLeft: 5, marginTop: 3 }}><i class="fa fa-spinner fa-pulse fa-3x fa-fw" style={{ fontSize: 30 }}></i></span> : ''}
                                         <Button type="reset" color="secondary" className={`reset-button ${classes.button}`} onClick={this.clearData}>
                                            Xóa thông tin
                                            <DeleteIcon className={classes.rightIcon} />
                                        </Button>
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    <h2 className="titleForm">Thông tin cá nhân ( Không bắt buộc )</h2>
                                    <div className="row">
                                        <div className="col-md-3">
                                            <div className="avatarUpload">
                                                <label htmlFor="imageUrl"><b>Ảnh:</b></label>
                                                <div className="avatarEdit">
                                                    <input type="file" id="imageUpload" onChange={this.handleChangeFile} name="imageUrl" accept=".png, .jpg, .jpeg" />
                                                    <label htmlFor="imageUpload" />
                                                </div>
                                                <div className="avatarPreview">
                                                    <div style={{ backgroundImage: imagePreview === '' ? `url(http://localhost:8080/api/file/admin/no-image.jpg)` : `url(${imagePreview}` }}>{/*https://cdnjsx.herokuapp.com/api/file/admin/no-image.jpg */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-9">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <label htmlFor="firstName"><b>Họ:</b></label>
                                                    <input type="text" maxLength="50" onChange={this.handleChange} placeholder="VD: Đào Huy, Hoàng Ngọc, Hoàng Thị..." name="firstName" />
                                                </div>
                                                <div className="col-md-6">
                                                    <label htmlFor="lastName"><b>Tên:</b></label>
                                                    <input type="text" maxLength="50" onChange={this.handleChange} placeholder="VD: Đức, Khánh, Hà..." name="lastName" />
                                                </div>
                                            </div>
                                            <label htmlFor="email"><b>Email:</b></label>
                                            <input type="email" maxLength="5" maxLength="254" onChange={this.handleChange} placeholder="VD: huyducactvn.edu.vn, huyduc@gmail.com..." name="email" />
                                        </div>

                                        <div className="col-md-6">
                                            <label htmlFor="birthday"><b>Ngày sinh:</b></label>
                                            <input type="date" placeholder="VD: 1998-10-02, 1999-08-12" name="birthday" onChange={this.handleChange} />
                                            <label htmlFor="nations"><b>Dân tộc:</b></label>
                                            <select name="nations" id="nations" onChange={this.handleChange}>
                                                <option value="Kinh">Kinh</option>
                                                <option value="Khác">Khác...</option>
                                            </select>
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="sex"><b>Giới tính:</b></label>
                                            <div className="sex">
                                                <div class="form-check-inline">
                                                    <label className="form-check-label">
                                                        <input type="radio" defaultValue={true} onChange={this.handleChange} className="form-check-input" defaultChecked={true} name="sex" />Nam
                                                </label>
                                                </div>
                                                <div className="form-check-inline">
                                                    <label className="form-check-label">
                                                        <input type="radio" defaultValue={false} onChange={this.handleChange} className="form-check-input" name="sex" />Nữ
                                                </label>
                                                </div>
                                            </div>
                                            <label htmlFor="identity_card_number"><b>Số CMND/CCCD:</b></label>
                                            <input type="text" onChange={this.handleChange} placeholder="VD: 175077212, 178221981..." name="identityCardNumber" />
                                        </div>

                                        <div className="col-md-6">
                                            <label htmlFor="address"><b>Hộ khẩu thường trú:</b></label>
                                            <input type="text" maxLength="254" onChange={this.handleChange} placeholder="VD: 180 Chiến Thắng, Văn Quán, Hà Đông, Hà Nội...." name="address" />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="address1"><b>Nơi sống hiện tại:</b></label>
                                            <input type="text" maxLength="254" onChange={this.handleChange} placeholder="VD: 180 Chiến Thắng, Văn Quán, Hà Đông, Hà Nội...." name="address1" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div >
            </DocumentTitle>
        );
    }
}

FormSign.propTypes = {
    classes: PropTypes.object.isRequired,
    status: PropTypes.objectOf({
        progress: PropTypes.bool.isRequired,
        status: PropTypes.string.isRequired,
        data: PropTypes.object.isRequired
    }).isRequired,
    createNewUserAccount: PropTypes.func.isRequired,
    uploadAvatar: PropTypes.func.isRequired,
};

FormSign.defaultProps = {
    status: { progress: false, status: '', data: {} }
}

const mapStateToProps = state => ({
    status: state.account.status
});

const mapDispatchToProps = {
    createNewUserAccount: accountOperations.doCreateNewAccount,
    uploadAvatar: fileOperations.doUploadFile
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(FormSign)));