package com.huyduc.manage.web.rest.errors;

public class LoginAlreadyUsedException extends BadRequestAlertException {

    private static final long serialVersionUID = 1L;

    public LoginAlreadyUsedException() {
        super(ErrorConstants.LOGIN_ALREADY_USED_TYPE, "Tên đăng nhập đã được sử dụng!", "userManagement", "userexists");
    }
}
 