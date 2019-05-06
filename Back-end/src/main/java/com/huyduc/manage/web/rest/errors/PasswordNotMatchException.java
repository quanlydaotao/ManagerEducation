package com.huyduc.manage.web.rest.errors;

import org.zalando.problem.AbstractThrowableProblem;
import org.zalando.problem.Status;

public class PasswordNotMatchException extends AbstractThrowableProblem {
    private static final long serialVersionUID = 1L;

    public PasswordNotMatchException() {
        super(ErrorConstants.PASSWORD_NOT_MATCH_TYPE, "Mật khẩu nhập lại không trùng khớp!", Status.BAD_REQUEST);
    }
}
