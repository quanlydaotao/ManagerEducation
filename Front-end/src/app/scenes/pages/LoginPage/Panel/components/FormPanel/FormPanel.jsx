import React, { Component } from 'react';
import styles from './styles.css';
import Recaptcha from 'react-recaptcha';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { formLoginShape } from '../../../../../propTypes';
import { sessionOperations } from '../../../../../../state/ducks/session';

let recaptchaInstance;
class FormPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            role: '',
            rememberMe: false,
            isVerifyCaptcha: false
        }
    }
    resetRecaptcha = () => {
        recaptchaInstance.reset();
        this.setState({isVerifyCaptcha: false});
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
        const { username, password, role, rememberMe, isVerifyCaptcha } = this.state;
        // login if not errors
        if (isVerifyCaptcha)
            this.props.login(username, password, rememberMe);
        this.resetRecaptcha();
    }
    // captcha config
    callback = () => {
    }
    verifyCallback = (res) => {
        if (res) {
            this.setState({ isVerifyCaptcha: true })
        }
    }
    render() {
        const { isVerifyCaptcha } = this.state;
        const { isAuth } = this.props;
        let error = false;
        if ((isAuth.loggedIn === false) && (isAuth.user === "Login failed")) {
            error = true;
        }
        return (
            <form action="###" onSubmit={this.handleSubmit}>
                <h3 className="titleLogin">Đăng nhập</h3>
                {error ? <div className="alert alert-warning alert-dismissible fade show" role="alert">
                    <strong>Lỗi!</strong> Mã đăng nhập hoặc mật khẩu không đúng.
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div> : ''}
                <input className={`form-control ${styles.uName} ${styles.control}`} id="UserName" name="username" placeholder="Mã đăng nhập cá nhân" type="text" onChange={this.handleChange} required />
                <input autoComplete="off" className={`form-control ${styles.uPass} ${styles.control}`} id="Password" name="password" placeholder="Mật khẩu" type="password" onChange={this.handleChange} required />
                <select name="role" style={{ marginTop: 15, fontSize: 13, color: '#6c757d' }} className={`custom-select mr-sm-2 ${styles.control}`} onChange={this.handleChange} required>
                    <option value="">-- Đăng nhập với tư cách --</option>
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
                <button disabled={!isVerifyCaptcha} type="submit" id="btn-dangnhap" className={`btn btn-primary btn-block`} value="ĐĂNG NHẬP" style={{ marginTop: 15 }}>ĐĂNG NHẬP <i class="fa fa-chevron-circle-right" aria-hidden="true"></i></button><br />
            </form>
        );
    }
}

FormPanel.PropTypes = {
    isAuth: PropTypes.arrayOf(formLoginShape).isRequired,
    login: PropTypes.func.isRequired
}

FormPanel.defaultProps = {
    isAuth: {}
}

const mapStateToProps = state => ({
    isAuth: state.session.isAuthenticated
});

const mapDispatchToProps = {
    login: sessionOperations.login
};

export default connect(mapStateToProps, mapDispatchToProps)(FormPanel);
