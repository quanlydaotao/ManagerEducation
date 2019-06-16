package com.huyduc.manage.bean;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "tuition")
public class Tuition implements Serializable {
    private long id;
    private String name;
    private String amountToPay;
    private String moneyReduced;
    private String amountMissing;
    private String descript;
    private boolean status;
    private DetailTimetables detailTimetable;
    private Set<Payment> payments;
    private User user;

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
    @Size(min = 3, max = 100)
    @Column(name = "name", length = 100, nullable = false, unique = true)
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Basic
    @NotNull
    @NotBlank
    @Size(min = 1, max = 50)
    @Column(name = "amount_to_pay", length = 50, nullable = false)
    public String getAmountToPay() {
        return amountToPay;
    }

    public void setAmountToPay(String amountToPay) {
        this.amountToPay = amountToPay;
    }

    @Basic
    @NotNull
    @NotBlank
    @Size(min = 1, max = 50)
    @Column(name = "money_reduced", length = 50, nullable = false)
    public String getMoneyReduced() {
        return moneyReduced;
    }

    public void setMoneyReduced(String moneyReduced) {
        this.moneyReduced = moneyReduced;
    }

    @Basic
    @NotNull
    @NotBlank
    @Size(min = 1, max = 50)
    @Column(name = "amount_missing", length = 50,  nullable = false)
    public String getAmountMissing() {
        return amountMissing;
    }

    public void setAmountMissing(String amountMissing) {
        this.amountMissing = amountMissing;
    }

    @Basic
    @Column(name = "descript")
    public String getDescript() {
        return descript;
    }

    public void setDescript(String descript) {
        this.descript = descript;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Tuition tuition = (Tuition) o;
        return id == tuition.id &&
                status == tuition.status &&
                Objects.equals(name, tuition.name) &&
                Objects.equals(amountToPay, tuition.amountToPay) &&
                Objects.equals(moneyReduced, tuition.moneyReduced) &&
                Objects.equals(amountMissing, tuition.amountMissing) &&
                Objects.equals(descript, tuition.descript);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, amountToPay, moneyReduced, amountMissing, descript, status);
    }

    @OneToOne(mappedBy = "tuition", fetch = FetchType.EAGER)
    public DetailTimetables getDetailTimetable() {
        return detailTimetable;
    }

    public void setDetailTimetable(DetailTimetables detailTimetable) {
        this.detailTimetable = detailTimetable;
    }

    @OneToMany(mappedBy = "tuition", fetch = FetchType.LAZY, cascade = { CascadeType.PERSIST, CascadeType.REMOVE })
    public Set<Payment> getPayments() {
        return payments;
    }

    public void setPayments(Set<Payment> payments) {
        this.payments = payments;
    }

    @ManyToOne
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
