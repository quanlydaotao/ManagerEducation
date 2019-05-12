package com.huyduc.manage.web.rest.errors;

public class FileStorageException extends BadRequestAlertException {

    public FileStorageException() {
        super(ErrorConstants.FILE_UPLOAD_FAILURE, "Upload hình ảnh thất bại!", "userManagement", "file");
    }
}
