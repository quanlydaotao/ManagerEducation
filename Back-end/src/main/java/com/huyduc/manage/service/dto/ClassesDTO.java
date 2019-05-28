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
    @Size(min = 5, max = 100)
    private String name;

    private String describe;

    @NotNull
    private Date openDay;

    @NotNull
    private Date closeDay;

    @NotNull
    private boolean status;

    private YearsDTO yearDTO;

    private Long idYear;

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

    public YearsDTO getYearDTO() {
        return yearDTO;
    }

    public void setYearDTO(YearsDTO yearDTO) {
        this.yearDTO = yearDTO;
    }

    public Long getIdYear() {
        return idYear;
    }

    public void setIdYear(Long idYear) {
        this.idYear = idYear;
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
        return "ClassesDTO{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", describe='" + describe + '\'' +
                ", openDay=" + openDay +
                ", closeDay=" + closeDay +
                ", status=" + status +
                ", yearDTO=" + yearDTO +
                ", idYear=" + idYear +
                '}';
    }
}
