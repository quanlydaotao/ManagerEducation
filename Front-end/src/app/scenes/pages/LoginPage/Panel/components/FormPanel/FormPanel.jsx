import React from 'react';
import styles from './styles.css';

const FormPanel = () => {
    return (
        <form action="Login" method="post">
            <h3 className="titleLogin">Đăng nhập</h3>
            <input className={`form-control ${styles.uName} ${styles.control}`} id="UserName" name="UserName" placeholder="Tên tài khoản" type="text"/>
            <input autoComplete="off" className={`form-control ${styles.uPass} ${styles.control}`} id="Code" name="Code" placeholder="Mật khẩu" type="password"/>
            <select name="gv" style={{marginTop: 15, fontSize: 13, color: '#6c757d'}} className={`custom-select mr-sm-2 ${styles.control}`} >
                <option value="0" selected>-- Đăng nhập với tư cách --</option>
                <option value="1">Tài khoản giáo viên</option>
                <option value="2">Tài khoản phụ huynh</option>
                <option value="3">Tài khoản học sinh</option>
            </select>
            <div className={`${styles.captcha}`}>
                <img id="ImgCaptcha" src="http://thisinh.thithptquocgia.edu.vn/Account/GetCaptchaImage?time=1554960210806&choose=1" />
                <img id="refreshCaptcha" src="http://thisinh.thithptquocgia.edu.vn/Content/Images/1452604651_refresh.png" style={{ cursor: 'pointer' }} />
            </div>
            <input autoComplete="off" className={`form-control ${styles.uName} ${styles.control}`} id="captcha" name="ConfirmCode" placeholder="Mã xác nhận" type="text"/>
            <a href="#" style={{color: '#666666'}}><small>Quên mã đăng nhập?</small></a>
            <div className="mgt" style={{ color: 'red' }}>
            </div>
            <input type="submit" id="btn-dangnhap" className={`btn btn-success btn-block ${styles.btnLogin}`} value="ĐĂNG NHẬP" style={{marginTop: 15}}/><br />
        </form>
    );
}

export default FormPanel;
