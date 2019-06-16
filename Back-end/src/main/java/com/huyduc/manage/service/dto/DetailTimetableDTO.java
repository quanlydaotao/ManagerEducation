package com.huyduc.manage.service.dto;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.sql.Date;
import java.util.Objects;


/**
 * A DTO represents a Detail Timetable.
 */
public class DetailTimetableDTO {

    private long id;

    @NotNull
    private int numberSession;

    @NotNull
    @Min(2)
    @Max(8)
    private int dayOfWeeks;

    @NotNull
    private Date timeStart;

    @NotNull
    private Date timeEnd;

    private Long timetableId;

    public DetailTimetableDTO() {
        // Empty constructor needed for Jackson.
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public int getNumberSession() {
        return numberSession;
    }

    public void setNumberSession(int numberSession) {
        this.numberSession = numberSession;
    }

    public int getDayOfWeeks() {
        return dayOfWeeks;
    }

    public void setDayOfWeeks(int dayOfWeeks) {
        this.dayOfWeeks = dayOfWeeks;
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

    public Long getTimetableId() {
        return timetableId;
    }

    public void setTimetableId(Long timetableId) {
        this.timetableId = timetableId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        DetailTimetableDTO that = (DetailTimetableDTO) o;
        return id == that.id &&
                numberSession == that.numberSession &&
                dayOfWeeks == that.dayOfWeeks &&
                Objects.equals(timeStart, that.timeStart) &&
                Objects.equals(timeEnd, that.timeEnd);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, numberSession, dayOfWeeks, timeStart, timeEnd, timetableId);
    }

    @Override
    public String toString() {
        return "DetailTimetableDTO{" +
                "id=" + id +
                ", numberSession=" + numberSession +
                ", dayOfWeeks=" + dayOfWeeks +
                ", timeStart=" + timeStart +
                ", timeEnd=" + timeEnd +
                ", timetableId=" + timetableId +
                '}';
    }
}
