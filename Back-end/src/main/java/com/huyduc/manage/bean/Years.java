package com.huyduc.manage.bean;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.sql.Date;
import java.util.Objects;
import java.util.Set;

/**
 * An Years.
 */
@Entity
@Table(name = "years")
public class Years implements Serializable {

    private long id;
    private String name;
    private String startYears;
    private String endYears;
    private Date openDay;
    private Date closeDay;
    private String describe;
    private int maximumClasses;
    private boolean status;
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
    @NotNull
    @NotBlank
    @Size(min = 9, max = 100)
    @Column(name = "name", length = 100, nullable = false)
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Basic
    @NotNull
    @NotBlank
    @Size(min = 4, max = 10)
    @Column(name = "start_years", length = 10, nullable = false)
    public String getStartYears() {
        return startYears;
    }

    public void setStartYears(String startYears) {
        this.startYears = startYears;
    }

    @Basic
    @NotNull
    @NotBlank
    @Size(min = 4, max = 10)
    @Column(name = "end_years", length = 10, nullable = false)
    public String getEndYears() {
        return endYears;
    }

    public void setEndYears(String endYears) {
        this.endYears = endYears;
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
    @Column(name = "describe")
    public String getDescribe() {
        return describe;
    }

    public void setDescribe(String describe) {
        this.describe = describe;
    }

    @Basic
    @NotNull
    @Column(name = "maximum_classes", nullable = false)
    public int getMaximumClasses() {
        return maximumClasses;
    }

    public void setMaximumClasses(int maximumClasses) {
        this.maximumClasses = maximumClasses;
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

    @OneToMany(mappedBy = "year")
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
        Years years = (Years) o;
        return id == years.id &&
                maximumClasses == years.maximumClasses &&
                status == years.status &&
                Objects.equals(name, years.name) &&
                Objects.equals(startYears, years.startYears) &&
                Objects.equals(endYears, years.endYears) &&
                Objects.equals(openDay, years.openDay) &&
                Objects.equals(closeDay, years.closeDay) &&
                Objects.equals(describe, years.describe);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, startYears, endYears, openDay, closeDay, describe, maximumClasses, status);
    }

    @Override
    public String toString() {
        return "Years{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", startYears='" + startYears + '\'' +
                ", endYears='" + endYears + '\'' +
                ", openDay=" + openDay +
                ", closeDay=" + closeDay +
                ", describe='" + describe + '\'' +
                ", maximumClasses=" + maximumClasses +
                ", status=" + status +
                ", classes=" + classes +
                '}';
    }
}
