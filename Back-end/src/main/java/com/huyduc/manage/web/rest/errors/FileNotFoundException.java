package com.huyduc.manage.web.rest.errors;

import org.zalando.problem.AbstractThrowableProblem;
import org.zalando.problem.Status;

public class FileNotFoundException extends AbstractThrowableProblem {
    private static final long serialVersionUID = 1L;

    public FileNotFoundException(String fileName) {
        super(ErrorConstants.EMAIL_NOT_FOUND_TYPE, "File "+fileName+" not found!", Status.NOT_FOUND);
    }
}
