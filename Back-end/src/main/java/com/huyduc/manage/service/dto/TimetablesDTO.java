package com.huyduc.manage.service.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.sql.Date;
import java.util.Objects;

/**
 * A DTO represents a Timetables.
 */
public class TimetablesDTO {
    private long id;

    @NotNull
    @NotBlank
    @Size(min = 3, max = 45)
    private String name;

    @NotNull
    private Date timeStart;

    @NotNull
    private Date timeEnd;

    public TimetablesDTO() {
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

    public Date getTimeStart() {
        return timeStart;
    }

    public void setTimeStart(Date timeStart) {
        this.timeStart = timeStart;
    }

    public Date getTimeEnd() {
        return timeEnd;
    }

    public void setTimeEnd(Date timeEnd) {
        this.timeEnd = timeEnd;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TimetablesDTO that = (TimetablesDTO) o;
        return id == that.id &&
                Objects.equals(name, that.name) &&
                Objects.equals(timeStart, that.timeStart) &&
                Objects.equals(timeEnd, that.timeEnd);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, timeStart, timeEnd);
    }

    @Override
    public String toString() {
        return "TimetablesDTO{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", timeStart=" + timeStart +
                ", timeEnd=" + timeEnd +
                '}';
    }
}
