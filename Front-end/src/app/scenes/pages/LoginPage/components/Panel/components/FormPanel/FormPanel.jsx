import React, { Component } from 'react';
import styles from './styles.css';
import Recaptcha from 'react-recaptcha';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { formLoginShape } from '../../../../../../propTypes';
import { sessionOperations } from '../../../../../../../state/ducks/session';
import { withRouter } from 'react-router';
let recaptchaInstance;
class FormPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            rememberMe: false,
            isVerifyCaptcha: false
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
        const { username, password, rememberMe, isVerifyCaptcha } = this.state;
        if (isVerifyCaptcha)
            this.props.login(username, password, rememberMe);
        this.resetRecaptcha();
    }
    callback = () => {
    }

    verifyCallback = (res) => {
        if (res) {
            this.setState({ isVerifyCaptcha: true })
        }
    }

    resetRecaptcha = () => {
        recaptchaInstance.reset();
        this.setState({ isVerifyCaptcha: false });
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
                <button disabled={!isVerifyCaptcha} type="submit" id="btn-dangnhap" className={`btn btn-primary btn-block`} value="ĐĂNG NHẬP" style={{ marginTop: 15 }}>ĐĂNG NHẬP {(!isAuth.loggedIn && (isAuth.user === "progress" ? <i class="fa fa-spinner fa-pulse fa-3x fa-fw" style={{fontSize: 18}}></i> : <i class="fa fa-chevron-circle-right" aria-hidden="true"></i>))}</button><br />
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FormPanel));
