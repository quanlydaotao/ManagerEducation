package com.huyduc.manage.bean;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.sql.Date;
import java.util.Objects;

@Entity
@Table(name = "detail_timetables")
public class DetailTimetables implements Serializable {
    private long id;
    private int numberSession;
    private int dayOfWeeks;
    private Date timeStart;
    private Date timeEnd;
    private Tuition tuition;
    private Timetables timetable;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    @Basic
    @NotNull
    @Column(name = "number_session", nullable = false)
    public int getNumberSession() {
        return numberSession;
    }

    public void setNumberSession(int numberSession) {
        this.numberSession = numberSession;
    }

    @Basic
    @NotNull
    @Min(2)
    @Max(8)
    @Column(name = "day_of_weeks", nullable = false)
    public int getDayOfWeeks() {
        return dayOfWeeks;
    }

    public void setDayOfWeeks(int dayOfWeeks) {
        this.dayOfWeeks = dayOfWeeks;
    }

    @Basic
    @NotNull
    @Column(name = "time_start", nullable = false)
    public Date getTimeStart() {
        return timeStart;
    }

    public void setTimeStart(Date timeStart) {
        this.timeStart = timeStart;
    }

    @Basic
    @NotNull
    @Column(name = "time_end", nullable = false)
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
        DetailTimetables that = (DetailTimetables) o;
        return id == that.id &&
                numberSession == that.numberSession &&
                dayOfWeeks == that.dayOfWeeks &&
                Objects.equals(timeStart, that.timeStart) &&
                Objects.equals(timeEnd, that.timeEnd);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, numberSession, dayOfWeeks, timeStart, timeEnd);
    }

    @OneToOne(fetch = FetchType.EAGER)
    public Tuition getTuition() {
        return tuition;
    }

    public void setTuition(Tuition tuition) {
        this.tuition = tuition;
    }

    @ManyToOne(fetch = FetchType.EAGER)
    public Timetables getTimetable() {
        return timetable;
    }

    public void setTimetable(Timetables timetable) {
        this.timetable = timetable;
    }
}
