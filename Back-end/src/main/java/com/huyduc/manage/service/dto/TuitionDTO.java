package com.huyduc.manage.service.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Objects;

/**
 * A DTO represents a Tuition.
 */
public class TuitionDTO {

    private long id;

    @NotNull
    @NotBlank
    @Size(min = 3, max = 100)
    private String name;

    @NotNull
    @NotBlank
    @Size(min = 1, max = 50)
    private String amountToPay;

    @NotNull
    @NotBlank
    @Size(min = 1, max = 50)
    private String moneyReduced;

    @NotNull
    @NotBlank
    @Size(min = 1, max = 50)
    private String amountMissing;

    private String descript;

    @NotNull
    private boolean status;

    private Long detailTimetableId;

    private Long userId;

    public TuitionDTO() {
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

    public String getAmountToPay() {
        return amountToPay;
    }

    public void setAmountToPay(String amountToPay) {
        this.amountToPay = amountToPay;
    }

    public String getMoneyReduced() {
        return moneyReduced;
    }

    public void setMoneyReduced(String moneyReduced) {
        this.moneyReduced = moneyReduced;
    }

    public String getAmountMissing() {
        return amountMissing;
    }

    public void setAmountMissing(String amountMissing) {
        this.amountMissing = amountMissing;
    }

    public String getDescript() {
        return descript;
    }

    public void setDescript(String descript) {
        this.descript = descript;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public Long getDetailTimetableId() {
        return detailTimetableId;
    }

    public void setDetailTimetableId(Long detailTimetableId) {
        this.detailTimetableId = detailTimetableId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TuitionDTO tuition = (TuitionDTO) o;
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
        return Objects.hash(id, name, amountToPay, moneyReduced, amountMissing, descript, status, detailTimetableId, userId);
    }

    @Override
    public String toString() {
        return "TuitionDTO{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", amountToPay='" + amountToPay + '\'' +
                ", moneyReduced='" + moneyReduced + '\'' +
                ", amountMissing='" + amountMissing + '\'' +
                ", descript='" + descript + '\'' +
                ", status=" + status +
                ", detailTimetableId=" + detailTimetableId +
                ", userId=" + userId +
                '}';
    }
}
