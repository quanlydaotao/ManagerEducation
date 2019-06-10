package com.huyduc.manage.web.rest.errors;

import org.zalando.problem.AbstractThrowableProblem;
import org.zalando.problem.Status;

public class CourseNotFoundException extends AbstractThrowableProblem {
    public CourseNotFoundException() {
        super(ErrorConstants.EMAIL_NOT_FOUND_TYPE, "Khóa học không tồn tại!", Status.BAD_REQUEST);
    }
}
