package com.huyduc.manage.bean;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.sql.Date;
import java.util.Objects;
import java.util.Set;

/**
 * An Classes.
 */
@Entity
@Table(name = "class")
public class Classes implements Serializable {

    private long id;
    private String classCode;
    private String name;
    private String describe;
    private Date openDay;
    private Date closeDay;
    private String classRoom;
    private boolean status;
    private Set<User> users;
    private Course course;

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
    @Size(min = 5, max = 50)
    @Column(name = "class_code", length = 50, nullable = false, unique = true)
    public String getClassCode() {
        return classCode;
    }

    public void setClassCode(String classCode) {
        this.classCode = classCode;
    }

    @Basic
    @NotNull
    @NotBlank
    @Size(min = 5, max = 100)
    @Column(name = "name", length = 100, nullable = false)
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Basic
    @Column(name = "describe")
    public String getDescribe() {
        return describe;
    }

    public void setDescribe(String describe) {
        this.describe = describe;
    }

    @Basic
    @NotNull
    @Column(name = "open_day", nullable = false)
    public Date getOpenDay() {
        return openDay;
    }

    public void setOpenDay(Date openDay) {
        this.openDay = openDay;
    }

    @Basic
    @NotNull
    @Column(name = "close_day", nullable = false)
    public Date getCloseDay() {
        return closeDay;
    }

    public void setCloseDay(Date closeDay) {
        this.closeDay = closeDay;
    }

    @Basic
    @NotNull
    @Column(name = "status", nullable = false)
    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    @Basic
    @Size(min = 0, max = 50)
    @Column(name = "class_room", length = 50)
    public String getClassRoom() {
        return classRoom;
    }

    public void setClassRoom(String classRoom) {
        this.classRoom = classRoom;
    }

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "classes_users", joinColumns = @JoinColumn(name = "class_id", referencedColumnName = "id", nullable = false), inverseJoinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false))
    public Set<User> getUsers() {
        return users;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }

    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinTable(name = "course_classes",
            joinColumns = @JoinColumn(name = "class_id",
            referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "course_id", referencedColumnName = "id"))
    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Classes classes = (Classes) o;
        return id == classes.id &&
                status == classes.status &&
                Objects.equals(classCode, classes.classCode) &&
                Objects.equals(name, classes.name) &&
                Objects.equals(describe, classes.describe) &&
                Objects.equals(classRoom, classes.classRoom) &&
                Objects.equals(openDay, classes.openDay) &&
                Objects.equals(closeDay, classes.closeDay);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, classCode, name, describe, openDay, closeDay, classRoom, status);
    }

    @Override
    public String toString() {
        return "Classes{" +
                "id=" + id +
                ", classCode='" + classCode + '\'' +
                ", name='" + name + '\'' +
                ", describe='" + describe + '\'' +
                ", openDay=" + openDay +
                ", closeDay=" + closeDay +
                ", classRoom=" + classRoom +
                ", status=" + status +
                ", users=" + users +
                ", course=" + course +
                '}';
    }
}
