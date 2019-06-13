package com.huyduc.manage.service.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.sql.Date;
import java.util.Objects;

/**
 * A DTO represents a class
 */
public class ClassesDTO {

    private long id;

    @NotNull
    @NotBlank
    @Size(min = 5, max = 50)
    private String classCode;

    @NotNull
    @NotBlank
    @Size(min = 5, max = 100)
    private String name;

    private String describe;

    @NotNull
    private Date openDay;

    private Date closeDay;

    private String classRoom;

    @NotNull
    private boolean status;

    private Long courseId;

    public ClassesDTO() {
        // Empty constructor needed for Jackson.
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescribe() {
        return describe;
    }

    public void setDescribe(String describe) {
        this.describe = describe;
    }

    public Date getOpenDay() {
        return openDay;
    }

    public void setOpenDay(Date openDay) {
        this.openDay = openDay;
    }

    public Date getCloseDay() {
        return closeDay;
    }

    public void setCloseDay(Date closeDay) {
        this.closeDay = closeDay;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public String getClassCode() {
        return classCode;
    }

    public void setClassCode(String classCode) {
        this.classCode = classCode;
    }

    public String getClassRoom() {
        return classRoom;
    }

    public void setClassRoom(String classRoom) {
        this.classRoom = classRoom;
    }

    public Long getCourseId() {
        return courseId;
    }

    public void setCourseId(Long courseId) {
        this.courseId = courseId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ClassesDTO classesDTO = (ClassesDTO) o;
        return id == classesDTO.id &&
                status == classesDTO.status &&
                Objects.equals(classCode, classesDTO.classCode) &&
                Objects.equals(name, classesDTO.name) &&
                Objects.equals(classRoom, classesDTO.classRoom) &&
                Objects.equals(describe, classesDTO.describe) &&
                Objects.equals(openDay, classesDTO.openDay) &&
                Objects.equals(closeDay, classesDTO.closeDay);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, classCode, name, describe, openDay, closeDay, classRoom, status);
    }

    @Override
    public String toString() {
        return "ClassesDTO{" +
                "id=" + id +
                ", classCode='" + classCode + '\'' +
                ", name='" + name + '\'' +
                ", describe='" + describe + '\'' +
                ", openDay=" + openDay +
                ", closeDay=" + closeDay +
                ", classRoom='" + classRoom + '\'' +
                ", status=" + status +
                ", courseId=" + courseId +
                '}';
    }
}
