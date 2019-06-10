package com.huyduc.manage.web.rest.vm;

import com.huyduc.manage.service.dto.ClassesDTO;

import javax.validation.constraints.NotNull;

/**
 * View Model extending the ClassesDTO, which is meant to be used in the class management UI.
 */
public class ManagedClassesVM extends ClassesDTO {

    @NotNull
    private Long courseId;

    public ManagedClassesVM() {
        // Empty constructor needed for Jackson.
    }

    public Long getCourseId() {
        return courseId;
    }

    public void setCourseId(Long courseId) {
        this.courseId = courseId;
    }

    @Override
    public String toString() {
        return "ManagedClassesVM{" +
                "courseId=" + courseId +
                '}';
    }
}
