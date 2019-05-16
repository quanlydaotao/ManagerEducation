import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import leftimage from './images/leftimage.png';
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
import { Link } from 'react-router-dom';
import DocumentTitle from 'react-document-title';

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

    constructor(props) {
        super(props);
        this.state = {
            login: '', password: '', re_password: '',
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
        }
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.findUserAccountById(id);
    }

    render() {
        const id = this.props.match.params;
        const { classes, statusForm, account } = this.props;
        return (
            <DocumentTitle title={'.:Chỉnh sửa thông tin tài khoản:.'}>
                <div className={`${styles.popupForm}`}>
                    <Dialog
                        fullScreen
                        open={true}
                        onClose={this.handleClose}
                        TransitionComponent={Transition}
                    >
                        <AppBar className={classes.appBar}>
                            <Toolbar style={{ minHeight: 50 }}>
                                <Link to="/administrator/account">
                                    <IconButton color="inherit" onClick={this.props.closeForm} aria-label="Close">
                                        <CloseIcon />
                                    </IconButton>
                                </Link>
                                <Typography variant="h6" color="inherit" className={classes.flex}>
                                    Chỉnh sửa thông tin tài khoản
                            </Typography>
                                <Button color="inherit" onClick={this.handleForm}>
                                    <RefreshIcon /> XÓA THÔNG TIN
                            </Button>
                                <Button color="inherit" onClick={this.handleForm} >
                                    <SaveIcon /> LƯU THÔNG TIN
                            </Button>
                            </Toolbar>
                        </AppBar>
                        <div className={`contentForm ${styles.formEdit}`} style={{padding: '30px 0'}}>
                            <div className="container-fluid">
                                <form onSubmit={this.handleSubmit} encType="multipart/form-data">
                                    <div className="row">
                                        <div className="col-md-7">
                                            <img src={leftimage} alt="" style={{ width: '100%' }} />
                                        </div>
                                        <div className={`col-md-5 ${styles.rightContent}`}>
                                            <h2 className="titleForm">THÔNG TIN ĐĂNG KÝ</h2>
                                            <label htmlFor="login"><b>Mã đăng nhập: (*)</b></label>
                                            <input type="text" defaultValue={account.login} pattern="(AD|PH|GV|HV)+([0-9]{5})\b" minLength="7" maxLength="50" onChange={this.handleChange} placeholder="VD: AD88901, GV67834, PH09813, HV00001..." name="login" required />
                                            <label htmlFor="password"><b>Mật khẩu: (*)</b></label>
                                            <input type="password" autoComplete="false" minLength="4" maxLength="100" onChange={this.handleChange} placeholder="VD: Meocon123, Abc@1234..." name="password" required />
                                            <label htmlFor="re_password"><b>Nhập lại mật khẩu: (*)</b></label>
                                            <input type="password" autoComplete="false" minLength="4" maxLength="100" onChange={this.handleChange} placeholder="Nhập lại mật khẩu..." name="re_password" required />
                                            <label htmlFor="phone_number"><b>Nhập số điện thoại: (*)</b></label>
                                            <input type="text" defaultValue={account.phoneNumber} pattern="^(03[2|3|4|5|6|7|8|9]|07[0|6|7|8|9]|08[1|2|3|4|5]|05[6|8|9])[0-9]{7}$" minLength="10" maxLength="20" onChange={this.handleChange} placeholder="VD: 0363205500, 0984610934..." name="phoneNumber" required />
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <label htmlFor="authorities"><b>Loại tài khoản: (*)</b></label>
                                                    <select name="authorities" id="role" onChange={this.handleChange} required>
                                                        <option value="">--- Loại tài khoản ---</option>
                                                        <option value="ROLE_ADMIN" selected={(account.authorities && account.authorities[0] === 'ROLE_ADMIN') ? true : false}>Quản trị viên</option>
                                                        <option value="ROLE_TEACHER" selected={(account.authorities && account.authorities[0] === 'ROLE_TEACHER') ? true : false}>Giảng viên</option>
                                                        <option value="ROLE_PARENTS" selected={(account.authorities && account.authorities[0] === 'ROLE_PARENTS') ? true : false}>Phụ huynh</option>
                                                        <option value="ROLE_STUDENT" selected={(account.authorities && account.authorities[0] === 'ROLE_STUDENT') ? true : false}>Học viên</option>
                                                    </select>
                                                </div>
                                                <div className="col-md-6">
                                                    <label htmlFor="activated"><b>Trạng thái:</b></label>
                                                    <select name="activated" onChange={this.handleChange} id="activated" required>
                                                        <option value={true} selected={account.activated ? true : false}>Kích hoạt</option>
                                                        <option value={false} selected={account.activated ? false : true}>Chưa kích hoạt</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <h2 className="titleForm">THÔNG TIN CÁ NHÂN</h2>
                                            <div className="row">
                                                <div className="col-md-3">
                                                    <div className="avatarUpload">
                                                        <label htmlFor="imageUrl"><b>Ảnh:</b></label>
                                                        <div className="avatarEdit">
                                                            <input type="file" id="imageUpload" onChange={this.handleChangeFile} name="imageUrl" accept=".png, .jpg, .jpeg" />
                                                            <label htmlFor="imageUpload" />
                                                        </div>
                                                        <div className="avatarPreview">
                                                            <div style={{ backgroundImage:`url(http://localhost:8080/api/file/admin/no-image.jpg)`}}>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-8">
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
                                                                <input type="radio" value={true} onChange={this.handleChange} className="form-check-input" name="sex" checked />Nam
                                                </label>
                                                        </div>
                                                        <div className="form-check-inline">
                                                            <label className="form-check-label">
                                                                <input type="radio" value={false} onChange={this.handleChange} className="form-check-input" name="sex" />Nữ
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
                        </div>
                    </Dialog>
                </div>
            </DocumentTitle>
        );
    }
}

PopupFormEdit.propTypes = {
    classes: PropTypes.object.isRequired,
    statusForm: PropTypes.bool.isRequired,
    closeForm: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    account: state.account.getAccounts,
    statusForm: state.account.toggleEditAccounts,
});

const mapDispatchToProps = {
    closeForm: accountOperations.closeFormEdit,
    findUserAccountById: accountOperations.getUserAccountById
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(PopupFormEdit));