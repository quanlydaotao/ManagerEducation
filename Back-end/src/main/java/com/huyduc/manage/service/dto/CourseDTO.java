package com.huyduc.manage.service.dto;
import com.huyduc.manage.bean.Classes;
import com.huyduc.manage.bean.Years;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.sql.Timestamp;
import java.util.Objects;
import java.util.Set;

/**
 * A DTO represents a course.
 */
public class CourseDTO {
    private long id;

    @NotNull
    @NotBlank
    @Size(min = 3, max = 100)
    private String name;

    @NotNull
    private int maxClasses;

    private Timestamp dateOpen;

    private Timestamp dateClose;

    @NotNull
    private boolean status;

    public CourseDTO() {
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

    public int getMaxClasses() {
        return maxClasses;
    }

    public void setMaxClasses(int maxClasses) {
        this.maxClasses = maxClasses;
    }

    public Timestamp getDateOpen() {
        return dateOpen;
    }

    public void setDateOpen(Timestamp dateOpen) {
        this.dateOpen = dateOpen;
    }

    public Timestamp getDateClose() {
        return dateClose;
    }

    public void setDateClose(Timestamp dateClose) {
        this.dateClose = dateClose;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CourseDTO courseDTO = (CourseDTO) o;
        return id == courseDTO.id &&
                maxClasses == courseDTO.maxClasses &&
                status == courseDTO.status &&
                Objects.equals(name, courseDTO.name) &&
                Objects.equals(dateOpen, courseDTO.dateOpen) &&
                Objects.equals(dateClose, courseDTO.dateClose);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, maxClasses, dateOpen, dateClose, status);
    }
}
