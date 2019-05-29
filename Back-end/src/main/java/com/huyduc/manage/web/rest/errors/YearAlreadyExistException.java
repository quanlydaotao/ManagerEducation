package com.huyduc.manage.web.rest.errors;

public class YearAlreadyExistException extends BadRequestAlertException {
    public YearAlreadyExistException() {
        super(ErrorConstants.YEAR_ALREADY_EXISTS_TYPE, "Năm học đã tồn tại!", "yearManagement", "yearexists");
    }
}
