package com.huyduc.manage.service.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.sql.Timestamp;
import java.util.Objects;

/**
 * A DTO represents a Payment.
 */
public class PaymentDTO {
    private long id;

    @NotNull
    @NotBlank
    @Size(min = 3, max = 50)
    private String namePay;

    @NotNull
    @NotBlank
    @Size(min = 1, max = 50)
    private String amount;

    @NotNull
    private Timestamp paymentDate;

    @NotNull
    @NotBlank
    @Size(min = 5, max = 100)
    private String userPay;

    private String descript;

    private Long tuitionId;

    public PaymentDTO() {
        // Empty constructor needed for Jackson.
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getNamePay() {
        return namePay;
    }

    public void setNamePay(String namePay) {
        this.namePay = namePay;
    }

    public String getAmount() {
        return amount;
    }

    public void setAmount(String amount) {
        this.amount = amount;
    }

    public Timestamp getPaymentDate() {
        return paymentDate;
    }

    public void setPaymentDate(Timestamp paymentDate) {
        this.paymentDate = paymentDate;
    }

    public String getUserPay() {
        return userPay;
    }

    public void setUserPay(String userPay) {
        this.userPay = userPay;
    }

    public String getDescript() {
        return descript;
    }

    public void setDescript(String descript) {
        this.descript = descript;
    }

    public Long getTuitionId() {
        return tuitionId;
    }

    public void setTuitionId(Long tuitionId) {
        this.tuitionId = tuitionId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PaymentDTO payment = (PaymentDTO) o;
        return id == payment.id &&
                Objects.equals(namePay, payment.namePay) &&
                Objects.equals(amount, payment.amount) &&
                Objects.equals(paymentDate, payment.paymentDate) &&
                Objects.equals(userPay, payment.userPay) &&
                Objects.equals(descript, payment.descript);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, namePay, amount, paymentDate, userPay, descript, tuitionId);
    }

    @Override
    public String toString() {
        return "PaymentDTO{" +
                "id=" + id +
                ", namePay='" + namePay + '\'' +
                ", amount='" + amount + '\'' +
                ", paymentDate=" + paymentDate +
                ", userPay='" + userPay + '\'' +
                ", descript='" + descript + '\'' +
                ", tuitionId=" + tuitionId +
                '}';
    }
}
