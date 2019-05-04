import React, { Component } from 'react';
import styles from './styles.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { accountShape } from '../../../../../propTypes';
import { accountOperations } from '../../../../../../state/ducks/account';


// isErrors = datas => {
//     let login = '';
//     let password = '';
//     let re_password = '';
//     let phone_number = '';
//     let role = '';
//     const { activeStep } = this.state;
//     let count = 0;
//     if (activeStep === 0) {
//         if (datas.login === '') {
//             login = "Mã đăng nhập không được để trống!";
//         } else if (!/((AD|PH|GV|HV)+([0-9]{5})\b)/.test(datas.login)) {
//             login = "Mã đăng nhập không hợp lệ!";
//         } else {
//             login = "";
//         }

//         if (datas.password === '') {
//             password = "Mật khẩu không được để trống!";
//         } else if ((datas.password.length < 4) || (datas.password.length > 100)) {
//             password = "Mật khẩu phải lớn hơn 3 ký tự và bé hơn 101 ký tự!";
//         } else {
//             password = "";
//         }

//         if (datas.re_password === '') {
//             re_password = "Mật khẩu nhập lại không được để trống!";
//         } else if (datas.re_password !== datas.password) {
//             re_password = "Mật khẩu nhập lại không khớp!";
//         } else {
//             re_password = "";
//         }

//         if (datas.role === '') {
//             role = "Chưa chọn loại tài khoản!";
//         } else {
//             switch (datas.role) {
//                 case "ROLE_ADMIN":
//                     if (datas.login !== '' && datas.login.substring(0, 2) !== 'AD') {
//                         role = "Loại tài khoản không khớp với mã đăng nhập!";
//                     } else {
//                         role = "";
//                     }
//                     break;
//                 case "ROLE_TEACHER":
//                     if (datas.login !== '' && datas.login.substring(0, 2) !== 'GV') {
//                         role = "Loại tài khoản không khớp với mã đăng nhập!";
//                     } else {
//                         role = "";
//                     }
//                     break;
//                 case "ROLE_PARENTS":
//                     if (datas.login !== '' && datas.login.substring(0, 2) !== 'PH') {
//                         role = "Loại tài khoản không khớp với mã đăng nhập!";
//                     } else {
//                         role = "";
//                     }
//                     break;
//                 case "ROLE_STUDENT":
//                     if (datas.login !== '' && datas.login.substring(0, 2) !== 'HV') {
//                         role = "Loại tài khoản không khớp với mã đăng nhập!";
//                     } else {
//                         role = "";
//                     }
//                     break;
//             }
//         }

//     }
//     console.log('login: ' + login + ', password: ' + password + ', re_password: ' + re_password + ', role: ' + role);

// }


class FormSign extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: '',
            re_password: '',
            phone_number: '',
            authorities: [],
            imageUrl: '',
            firstName: '',
            lastName: '',
            email: '',
            birthday: null,
            sex: true,
            nations: 'Kinh',
            address: '',
            address1: '',
            langKey: 'vi',
            identity_card_number: '',
            activated: true
        }
    }

    handleChange = event => {
        var target = event.target;
        if(target.name === 'authorities') {
            this.setState({ authorities: [target.value]});
        } else {
            this.setState({[target.name]: target.value });
        }
    };

    handleChangeFile = event => {
        this.setState({imageUrl: event.target.files[0].name});
    }

    handleSubmit = event => {
        event.preventDefault();
        this.props.addNewUserAccount(this.state);
    }
    render() {
        const { classes } = this.props;
        return (
            <div className={`${styles.formSign}`}>
                <h3>ĐĂNG KÝ TÀI KHOẢN ĐĂNG NHẬP HỆ THỐNG</h3>
                <div>
                    <div><b>Chú ý:</b></div>
                    <ul>
                        <li>- Các trường thông tin đánh dấu <b>(*)</b> ở dưới là bắt buộc.</li>
                        <li>- Tên tài khoản tối thiểu 7 ký tự trong đó 2 ký tự đầu là mã chức vụ ứng với tài khoản. (<b>Admin</b>: 'ADxxxxx', <b>Giáo viên</b>: 'GVxxxxx', <b>Phụ huynh</b>: 'PHxxxxx' và <b>Học viên</b>: 'HVxxxxx').</li>
                        <li>- Mật khẩu tối thiểu 4 ký tự và tối đa 100 ký tự.</li>
                        <li>- Số điện thoại là các đầu số của <b>Việt Nam</b> (gồm 10 chữ số).</li>
                    </ul>
                </div>
                <div className={`${styles.contentForm}`}>
                    <form onSubmit={this.handleSubmit}>
                        <div className="row">
                            <div className="col-md-5">
                                <label htmlFor="login"><b>Mã đăng nhập (*)</b></label>
                                <input type="text" minLength="7" maxLength="50" onChange={this.handleChange} placeholder="VD: AD88901, GV67834, PH09813, HV00001..." name="login" required />
                                <label htmlFor="password"><b>Mật khẩu (*)</b></label>
                                <input type="password" minLength="4" maxLength="100" onChange={this.handleChange} placeholder="VD: Meocon123, Abc@1234..." name="password" required />
                                <label htmlFor="re_password"><b>Nhập lại mật khẩu (*)</b></label>
                                <input type="password" minLength="4" maxLength="100" onChange={this.handleChange} placeholder="Nhập lại mật khẩu..." name="re_password" required />
                                <label htmlFor="phone_number"><b>Nhập số điện thoại (*)</b></label>
                                <input type="text" minLength="10" maxLength="20" onChange={this.handleChange} placeholder="VD: 0363205500, 0984610934..." name="phone_number" required />
                                <div className="row">
                                    <div className="col-md-6">
                                        <label htmlFor="authorities"><b>Loại tài khoản (*)</b></label>
                                        <select name="authorities" id="role" onChange={this.handleChange} required>
                                            <option value="">--- Loại tài khoản ---</option>
                                            <option value="ROLE_ADMIN">Quản trị viên</option>
                                            <option value="ROLE_TEACHER">Giảng viên</option>
                                            <option value="ROLE_PARENTS">Phụ huynh</option>
                                            <option value="ROLE_STUDENT">Học viên</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="activated"><b>Trạng thái</b></label>
                                        <select name="activated" onChange={this.handleChange} id="activated" required>
                                            <option value={true}>Kích hoạt</option>
                                            <option value={false}>Chưa kích hoạt</option>
                                        </select>
                                    </div>
                                </div>
                                <p>By creating an account you agree to our <a href="#" style={{ color: 'dodgerblue' }}>Terms &amp; Privacy</a>.</p>
                                <div className="clearfix">
                                    <button type="reset" className="btn btn-danger" style={{marginRight: 10}}>XÓA THÔNG TIN</button>
                                    <button type="submit" className="btn btn-primary">ĐĂNG KÝ</button>
                                </div>
                            </div>
                            <div className="col-md-7">
                                <div className="row">
                                    <div className="col-md-3">
                                        <div className={`${styles.avatarUpload}`}>
                                            <label htmlFor="imageUrl"><b>Ảnh</b></label>
                                            <div className={`${styles.avatarEdit}`}>
                                                <input type="file" id="imageUpload" onChange={this.handleChangeFile} name="imageUrl" accept=".png, .jpg, .jpeg" />
                                                <label htmlFor="imageUpload" />
                                            </div>
                                            <div className={`${styles.avatarPreview}`}>
                                                <div id="imagePreview" style={{ backgroundImage: 'url(https://www.diginet.com.vn/wp-content/uploads/2019/01/no-image.jpg)' }}>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-9">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label htmlFor="firstName"><b>Họ</b></label>
                                                <input type="text" maxLength="50" onChange={this.handleChange} placeholder="VD: Đào Huy, Hoàng Ngọc, Hoàng Thị..." name="firstName" />
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="lastName"><b>Tên</b></label>
                                                <input type="text" maxLength="50" onChange={this.handleChange} placeholder="VD: Đức, Khánh, Hà..." name="lastName" />
                                            </div>
                                        </div>
                                        <label htmlFor="email"><b>Email</b></label>
                                        <input type="email" maxLength="5" maxLength="254" onChange={this.handleChange} placeholder="VD: huyducactvn.edu.vn, huyduc@gmail.com..." name="email" />
                                    </div>

                                    <div className="col-md-6">
                                        <label htmlFor="birthday"><b>Ngày sinh</b></label>
                                        <input type="date" placeholder="VD: 1998-10-02, 1999-08-12" name="birthday"  onChange={this.handleChange}/>
                                        <label htmlFor="nations"><b>Dân tộc</b></label>
                                        <select name="nations" id="nations" onChange={this.handleChange}>
                                            <option value="Kinh">Kinh</option>
                                            <option value="Khác">Khác...</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="sex"><b>Giới tính</b></label>
                                        <div className={`${styles.sex}`}>
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
                                        <label htmlFor="identity_card_number"><b>Số CMND/CCCD</b></label>
                                        <input type="text" onChange={this.handleChange} placeholder="VD: 175077212, 178221981..." name="identity_card_number" />
                                    </div>

                                    <div className="col-md-6">
                                        <label htmlFor="address"><b>Hộ khẩu thường trú</b></label>
                                        <input type="text" maxLength="254" onChange={this.handleChange} placeholder="VD: 180 Chiến Thắng, Văn Quán, Hà Đông, Hà Nội...." name="address" />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="address1"><b>Nơi sống hiện tại</b></label>
                                        <input type="text" maxLength="254" onChange={this.handleChange} placeholder="VD: 180 Chiến Thắng, Văn Quán, Hà Đông, Hà Nội...." name="address1" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

FormSign.propTypes = {
    classes: PropTypes.object.isRequired,
};


FormSign.propTypes = {
    accounts: PropTypes.arrayOf(accountShape).isRequired,
    addNewUserAccount: PropTypes.func.isRequired,
};

FormSign.defaultProps = {
    accounts: []
}

const mapStateToProps = state => ({
    accounts: state.account.accounts
});

const mapDispatchToProps = {
    addNewUserAccount: accountOperations.addNewUserAccount
};


export default connect(mapStateToProps, mapDispatchToProps)(FormSign);