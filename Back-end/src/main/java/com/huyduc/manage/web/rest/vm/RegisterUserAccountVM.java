package com.huyduc.manage.web.rest.vm;

import com.huyduc.manage.service.dto.UserDTO;

import javax.validation.constraints.Size;

public class RegisterUserAccountVM extends UserDTO {
    public static final int PASSWORD_MIN_LENGTH = 4;

    public static final int PASSWORD_MAX_LENGTH = 100;

    @Size(min = PASSWORD_MIN_LENGTH, max = PASSWORD_MAX_LENGTH)
    private String password;

    @Size(min = PASSWORD_MIN_LENGTH, max = PASSWORD_MAX_LENGTH)
    private String re_password;

    public RegisterUserAccountVM() {
        // Empty constructor needed for Jackson.
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRe_password() {
        return re_password;
    }

    public void setRe_password(String re_password) {
        this.re_password = re_password;
    }

    @Override
    public String toString() {
        return "RegisterUserAccountVM{" +
                "password='" + password + '\'' +
                ", re_password='" + re_password + '\'' +
                '}';
    }
}
