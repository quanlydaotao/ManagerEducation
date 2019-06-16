package com.huyduc.manage.bean;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.sql.Timestamp;
import java.util.Objects;

@Entity
@Table(name = "payment")
public class Payment implements Serializable {

    private long id;
    private String namePay;
    private String amount;
    private Timestamp paymentDate;
    private String userPay;
    private String descript;
    private Tuition tuition;

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
    @Size(min = 3, max = 50)
    @Column(name = "name_pay", length = 50, nullable = false)
    public String getNamePay() {
        return namePay;
    }

    public void setNamePay(String namePay) {
        this.namePay = namePay;
    }

    @Basic
    @NotNull
    @NotBlank
    @Size(min = 1, max = 50)
    @Column(name = "amount", length = 50, nullable = false)
    public String getAmount() {
        return amount;
    }

    public void setAmount(String amount) {
        this.amount = amount;
    }

    @Basic
    @NotNull
    @Column(name = "payment_date", nullable = false)
    public Timestamp getPaymentDate() {
        return paymentDate;
    }

    public void setPaymentDate(Timestamp paymentDate) {
        this.paymentDate = paymentDate;
    }

    @Basic
    @NotNull
    @NotBlank
    @Size(min = 5, max = 100)
    @Column(name = "user_pay")
    public String getUserPay() {
        return userPay;
    }

    public void setUserPay(String userPay) {
        this.userPay = userPay;
    }

    @Basic
    @Column(name = "descript")
    public String getDescript() {
        return descript;
    }

    public void setDescript(String descript) {
        this.descript = descript;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Payment payment = (Payment) o;
        return id == payment.id &&
                Objects.equals(namePay, payment.namePay) &&
                Objects.equals(amount, payment.amount) &&
                Objects.equals(paymentDate, payment.paymentDate) &&
                Objects.equals(userPay, payment.userPay) &&
                Objects.equals(descript, payment.descript);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, namePay, amount, paymentDate, userPay, descript);
    }

    @ManyToOne(fetch = FetchType.EAGER)
    public Tuition getTuition() {
        return tuition;
    }

    public void setTuition(Tuition tuition) {
        this.tuition = tuition;
    }
}
