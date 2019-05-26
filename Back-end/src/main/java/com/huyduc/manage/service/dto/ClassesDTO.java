package com.huyduc.manage.service.dto;

import com.huyduc.manage.bean.Classes;
import com.huyduc.manage.bean.User;
import com.huyduc.manage.bean.Years;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.sql.Date;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collector;
import java.util.stream.Collectors;

/**
 * A DTO represents a class
 */
public class ClassesDTO {

    private long id;

    @NotNull
    @NotBlank
    @Size(min = 5, max = 100)
    private String name;

    private String describe;

    @NotNull
    private Date openDay;

    @NotNull
    private Date closeDay;

    @NotNull
    private boolean status;

    private Years year;
    private Set<User> users;

    public ClassesDTO() {
        // Empty constructor needed for Jackson.
    }

    public ClassesDTO(Classes classes) {
        this.id = classes.getId();
        this.name = classes.getName();
        this.describe = classes.getDescribe();
        this.openDay = classes.getOpenDay();
        this.closeDay = classes.getCloseDay();
        this.status = classes.isStatus();
        this.year = classes.getYear();
        this.users = classes.getUsers();
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

    public Years getYear() {
        return year;
    }

    public void setYear(Years year) {
        this.year = year;
    }

    public Set<User> getUsers() {
        return users;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ClassesDTO classesDTO = (ClassesDTO) o;
        return id == classesDTO.id &&
                status == classesDTO.status &&
                Objects.equals(name, classesDTO.name) &&
                Objects.equals(describe, classesDTO.describe) &&
                Objects.equals(openDay, classesDTO.openDay) &&
                Objects.equals(closeDay, classesDTO.closeDay);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, describe, openDay, closeDay, status);
    }

    @Override
    public String toString() {
        return "Classes{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", describe='" + describe + '\'' +
                ", openDay=" + openDay +
                ", closeDay=" + closeDay +
                ", status=" + status +
                ", year=" + year +
                ", users=" + users +
                '}';
    }
}
