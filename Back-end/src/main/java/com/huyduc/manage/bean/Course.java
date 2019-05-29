package com.huyduc.manage.bean;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "course")
public class Course {
    private long id;
    private String name;
    private int maxClasses;
    private Timestamp dateOpen;
    private Timestamp dateClose;
    private boolean status;
    private Years year;
    private Set<Classes> classes;

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
    @Column(name = "name")
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Basic
    @Column(name = "max_classes")
    public int getMaxClasses() {
        return maxClasses;
    }

    public void setMaxClasses(int maxClasses) {
        this.maxClasses = maxClasses;
    }

    @Basic
    @Column(name = "date_open")
    public Timestamp getDateOpen() {
        return dateOpen;
    }

    public void setDateOpen(Timestamp dateOpen) {
        this.dateOpen = dateOpen;
    }

    @Basic
    @Column(name = "date_close")
    public Timestamp getDateClose() {
        return dateClose;
    }

    public void setDateClose(Timestamp dateClose) {
        this.dateClose = dateClose;
    }

    @Basic
    @Column(name = "status")
    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    @ManyToOne
    @JoinTable(name = "years_course", joinColumns = @JoinColumn(name = "course_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "years_id", referencedColumnName = "id"))
    public Years getYear() {
        return year;
    }

    public void setYear(Years year) {
        this.year = year;
    }

    @OneToMany(mappedBy = "course")
    public Set<Classes> getClasses() {
        return classes;
    }

    public void setClasses(Set<Classes> classes) {
        this.classes = classes;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Course course = (Course) o;
        return id == course.id &&
                maxClasses == course.maxClasses &&
                status == course.status &&
                Objects.equals(name, course.name) &&
                Objects.equals(dateOpen, course.dateOpen) &&
                Objects.equals(dateClose, course.dateClose);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, maxClasses, dateOpen, dateClose, status);
    }

}
