package com.huyduc.manage.config;
/**
 * Application constants.
 */
public final class Constants {

    // Regex for acceptable logins
    public static final String LOGIN_REGEX = "((AD|PH|GV|HV)+([0-9]{5})\\b)";
    public static final String SYSTEM_ACCOUNT = "system";
    public static final String ANONYMOUS_USER = "anonymoususer";
    public static final String DEFAULT_LANGUAGE = "en";
    
    private Constants() {
    }
}
