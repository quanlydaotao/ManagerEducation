import React, { Component } from 'react';
import styles from './styles.css';
import Recaptcha from 'react-recaptcha';
import { connect } from 'react-redux';
import { sessionOperations } from '../../../../../../state/ducks/session';

let recaptchaInstance;

const resetRecaptcha = () => {
    recaptchaInstance.reset();
}

class FormPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            role: '',
            rememberMe: false,
            isVerifyCaptcha: false,
            submitted: false,
            errors: {
                username: '',
                password: '',
                role: '',
                captcha: ''
            }
        }
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "rememberMe") {
            this.setState({ rememberMe: JSON.parse(value) })
        } else {
            this.setState({ [name]: value });
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ submitted: true });
        let err = {
            username: '',
            password: '',
            role: '',
            captcha: ''
        }
        const { username, password, role, rememberMe, isVerifyCaptcha } = this.state
        
        // validate form feild before submit form
        if (!this.checkUsername(username)) {
            if (username === '')
                err.username = '- Mã đăng nhập không được để trống!';
            else
                err.username = '- Mã đăng nhập bắt đầu bằng các ký tự A-Z, a-z (tối thiểu 2 ký tự) và tổng độ dài tối thiểu 7 ký tự (vd: AT130912).';
        } else {
            err.username = '';
        }
        if (!this.checkPassword(password)) {
            if (password === '')
                err.password = '- Mật khẩu không được để trống!';
            else
                err.password = '- Mật khẩu gồm các ký tự A-Z, a-z, 0-9 và ít nhất 5 ký tự (vd: Huyduc12345).';
        } else {
            err.password = '';
        }
        if (!this.checkRole(role)) {
            err.role = '- Chọn đăng nhập với tư cách!';
        } else {
            err.role = '';
        }
        if (!isVerifyCaptcha) {
            err.captcha = '- Chưa xác thực captcha!';
        } else {
            err.captcha = '';
        }

        // set state errors
        this.setState({
            errors: err
        });

        // login if not errors
        if (err.username === "" && err.password === "" && err.role === "" && err.captcha === "")
            this.props.login(username, password, rememberMe);
        else {

            // reset captcha if errors
            resetRecaptcha();
            this.setState({
                isVerifyCaptcha: false
            });
        }
    }


    // captcha config
    callback = () => {
    }
    verifyCallback = (res) => {
        if (res) {
            this.setState({ isVerifyCaptcha: true })
        }
    }
    checkUsername = username => /^[a-zA-Z]{2,}[0-9]{5,}$/.test(String(username).toUpperCase());
    checkPassword = password => /^[a-zA-Z0-9]{5,}$/.test(String(password));
    checkRole = (role) => (role === 'administrator' || role === 'teacher' || role === 'student' || role === 'parents') ? true : false;
    render() {
        
        // const { loggingIn } = this.props;
        const { isVerifyCaptcha, errors } = this.state;
        return (
            <form action="###" onSubmit={this.handleSubmit}>
                <h3 className="titleLogin">Đăng nhập</h3>
                <input className={`form-control ${styles.uName} ${styles.control}`} id="UserName" name="username" placeholder="Mã đăng nhập cá nhân" type="text" onChange={this.handleChange} />
                <input autoComplete="off" className={`form-control ${styles.uPass} ${styles.control}`} id="Password" name="password" placeholder="Mật khẩu" type="password" onChange={this.handleChange} />
                <select name="role" style={{ marginTop: 15, fontSize: 13, color: '#6c757d' }} className={`custom-select mr-sm-2 ${styles.control}`} onChange={this.handleChange}>
                    <option value="null" selected>-- Đăng nhập với tư cách --</option>
                    <option value="administrator">Tài khoản quản trị viên</option>
                    <option value="teacher">Tài khoản giáo viên</option>
                    <option value="parents">Tài khoản phụ huynh</option>
                    <option value="student">Tài khoản học sinh</option>
                </select>
                <div className={`${styles.captcha}`}>
                    <Recaptcha
                        ref={e => recaptchaInstance = e}
                        sitekey="6Le4A58UAAAAAJ3NVFsfXkEo67Ny2AvZwhFeB3kx"
                        render="explicit"
                        onloadCallback={this.callback}
                        verifyCallback={this.verifyCallback}
                    />
                </div>
                <div className="form-group form-check" style={{ marginTop: 10, fontSize: 13 }}>
                    <label className="form-check-label">
                        <input className="form-check-input" style={{ marginTop: 0 }} type="checkbox" name="rememberMe" onChange={this.handleChange} value={!this.state.rememberMe} /> Lưu tài khoản?
                    </label>
                </div>
                <a href="#" style={{ color: '#666666' }}><small>Quên mã đăng nhập?</small></a>
                <div className="mgt" style={{ color: 'red' }}>
                </div>
                <button type="submit" id="btn-dangnhap" className={`btn btn-success btn-block ${styles.btnLogin}`} value="ĐĂNG NHẬP" style={{ marginTop: 15 }}>Đăng nhập</button><br />
                <div className={`${errors.username === '' && errors.password === '' && errors.role === '' && errors.captcha === '' ? styles.hidden : styles.show}`}>
                    {errors.username !== '' ? <p>{errors.username}</p> : ''}
                    {errors.password !== '' ? <p>{errors.password}</p> : ''}
                    {errors.role !== '' ? <p>{errors.role}</p> : ''}
                    {errors.captcha !== '' ? <p>{errors.captcha}</p> : ''}
                </div>
            </form>
        );
    }
}

const mapStateToProps = state => ({
    isAuth: state.session.isAuthenticated
});

const mapDispatchToProps = {
    login: sessionOperations.login
};

export default connect(mapStateToProps, mapDispatchToProps)(FormPanel);
