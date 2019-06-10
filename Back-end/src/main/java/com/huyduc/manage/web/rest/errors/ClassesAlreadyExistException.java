package com.huyduc.manage.web.rest.errors;

public class ClassesAlreadyExistException extends BadRequestAlertException {

    public ClassesAlreadyExistException() {
        super(ErrorConstants.CLASS_ALREADY_EXISTS_TYPE, "Tên lớp đã tồn tại!", "classManagement", "classexists");
    }
}
