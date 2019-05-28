package com.huyduc.manage.web.rest.vm;

import com.huyduc.manage.service.dto.UserDTO;

public class UpdateUserAccountVM extends UserDTO {

    private String password;
    private String re_password;

    public UpdateUserAccountVM() {
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
        return "UpdateUserAccountVM{" +
                "password='" + password + '\'' +
                ", re_password='" + re_password + '\'' +
                '}';
    }
}
