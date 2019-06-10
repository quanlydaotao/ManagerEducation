package com.huyduc.manage.web.rest.errors;

import java.net.URI;

public final class ErrorConstants {

    public static final String ERR_CONCURRENCY_FAILURE = "error.concurrencyFailure";
    public static final String ERR_VALIDATION = "error.validation";
    public static final String PROBLEM_BASE_URL = "https://www.jhipster.tech/problem";
    public static final URI DEFAULT_TYPE = URI.create(PROBLEM_BASE_URL + "/problem-with-message");
    public static final URI CONSTRAINT_VIOLATION_TYPE = URI.create(PROBLEM_BASE_URL + "/constraint-violation");
    public static final URI PARAMETERIZED_TYPE = URI.create(PROBLEM_BASE_URL + "/parameterized");
    public static final URI ENTITY_NOT_FOUND_TYPE = URI.create(PROBLEM_BASE_URL + "/entity-not-found");
    public static final URI INVALID_PASSWORD_TYPE = URI.create(PROBLEM_BASE_URL + "/invalid-password");
    public static final URI PASSWORD_NOT_MATCH_TYPE = URI.create(PROBLEM_BASE_URL + "/password-not-match");
    public static final URI EMAIL_ALREADY_USED_TYPE = URI.create(PROBLEM_BASE_URL + "/email-already-used");
    public static final URI PHONE_NUMBER_ALREADY_USED_TYPE = URI.create(PROBLEM_BASE_URL + "/phone-number-already-used");
    public static final URI IDENTITY_CARD_NUMBER_ALREADY_USED_TYPE = URI.create(PROBLEM_BASE_URL + "/identity-card-number-already-used");
    public static final URI LOGIN_ALREADY_USED_TYPE = URI.create(PROBLEM_BASE_URL + "/login-already-used");
    public static final URI EMAIL_NOT_FOUND_TYPE = URI.create(PROBLEM_BASE_URL + "/email-not-found");
    public static final URI FILE_UPLOAD_FAILURE = URI.create(PROBLEM_BASE_URL + "/file-upload-failure");
    public static final URI FILE_NOT_FOUND_TYPE = URI.create(PROBLEM_BASE_URL + "/file-not-found");
    public static final URI YEAR_ALREADY_EXISTS_TYPE = URI.create(PROBLEM_BASE_URL + "/year-already-exists");
    public static final URI CLASS_ALREADY_EXISTS_TYPE = URI.create(PROBLEM_BASE_URL + "/class-already-exists");
    public static final URI COURSE_NOT_FOUND_TYPE = URI.create(PROBLEM_BASE_URL + "/course-not-found");

    private ErrorConstants() {
    }
}
