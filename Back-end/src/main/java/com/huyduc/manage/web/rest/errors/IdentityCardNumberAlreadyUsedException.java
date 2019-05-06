package com.huyduc.manage.web.rest.errors;

import org.zalando.problem.Status;

public class IdentityCardNumberAlreadyUsedException extends BadRequestAlertException {
    private static final long serialVersionUID = 1L;

    public IdentityCardNumberAlreadyUsedException() {
        super(ErrorConstants.IDENTITY_CARD_NUMBER_ALREADY_USED_TYPE, "Số CMND/CCCD đã được sử dụng!", "userManagement", "identityexists");
    }
}
