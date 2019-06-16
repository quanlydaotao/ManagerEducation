package com.huyduc.manage.bean;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.sql.Date;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "timetables")
public class Timetables implements Serializable {

    private long id;
    private String name;
    private Date timeStart;
    private Date timeEnd;
    private Set<DetailTimetables> details = new HashSet<>();

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
    @NotBlank
    @Size(min = 3, max = 45)
    @Column(name = "name", length = 45, unique = true, nullable = false)
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    @OneToMany(mappedBy = "timetable", fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    public Set<DetailTimetables> getDetails() {
        return details;
    }

    public void setDetails(Set<DetailTimetables> details) {
        this.details = details;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Timetables that = (Timetables) o;
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
        return "Timetables{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", timeStart=" + timeStart +
                ", timeEnd=" + timeEnd +
                ", details=" + details +
                '}';
    }
}
