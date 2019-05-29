package com.huyduc.manage.service.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.sql.Date;
import java.util.Objects;

/**
 * A DTO represents a school year.
 */

public class YearsDTO {

    private long id;

    @NotNull
    @NotBlank
    @Size(min = 9, max = 100)
    private String name;

    @NotNull
    @NotBlank
    @Size(min = 4, max = 10)
    private String startYears;

    private Date openDay;

    private Date closeDay;

    private String describe;

    @NotNull
    private int maximumClasses;

    @NotNull
    private boolean status;


    public YearsDTO() {
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

    public String getStartYears() {
        return startYears;
    }

    public void setStartYears(String startYears) {
        this.startYears = startYears;
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

    public String getDescribe() {
        return describe;
    }

    public void setDescribe(String describe) {
        this.describe = describe;
    }

    public int getMaximumClasses() {
        return maximumClasses;
    }

    public void setMaximumClasses(int maximumClasses) {
        this.maximumClasses = maximumClasses;
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
        YearsDTO yearsDTO = (YearsDTO) o;
        return id == yearsDTO.id &&
                maximumClasses == yearsDTO.maximumClasses &&
                status == yearsDTO.status &&
                Objects.equals(name, yearsDTO.name) &&
                Objects.equals(startYears, yearsDTO.startYears) &&
                Objects.equals(openDay, yearsDTO.openDay) &&
                Objects.equals(closeDay, yearsDTO.closeDay) &&
                Objects.equals(describe, yearsDTO.describe);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, startYears, openDay, closeDay, describe, maximumClasses, status);
    }

    @Override
    public String toString() {
        return "Years{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", startYears='" + startYears + '\'' +
                ", openDay=" + openDay +
                ", closeDay=" + closeDay +
                ", describe='" + describe + '\'' +
                ", maximumClasses=" + maximumClasses +
                ", status=" + status +
                '}';
    }
}
