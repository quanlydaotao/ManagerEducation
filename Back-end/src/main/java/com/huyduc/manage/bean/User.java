package com.huyduc.manage.bean;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.huyduc.manage.config.Constants;
import org.apache.commons.lang3.StringUtils;
import org.hibernate.annotations.BatchSize;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.sql.Date;
import java.sql.Timestamp;
import java.util.*;

/**
 * A user.
 */
@Entity
@Table(name = "user")
public class User implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @NotBlank
    @Size(min = 7, max = 50)
    @Pattern(regexp = Constants.LOGIN_REGEX)
    @Column(length = 50, unique = true, nullable = false)
    private String login;

    @NotNull
    @NotBlank
    @Size(min = 60, max = 60)
    @Column(name = "password_hash", length = 60, nullable = false)
    private String password;

    @Size(max = 50)
    @Column(name = "first_name", length = 50)
    private String firstName;

    @Size(max = 50)
    @Column(name = "last_name", length = 50)
    private String lastName;

    @Email
    @Size(max = 254)
    @Column(length = 254)
    private String email;

    @NotNull
    @Column(nullable = false)
    private boolean activated = false;

    @Size(min = 2, max = 6)
    @Column(name = "lang_key", length = 6)
    private String langKey;

    @Size(max = 256)
    @Column(name = "image_url", length = 256)
    private String imageUrl;

    @Size(max = 20)
    @Column(name = "activation_key", length = 20)
    @JsonIgnore
    private String activationKey;

    @Size(max = 20)
    @Column(name = "reset_key", length = 20)
    @JsonIgnore
    private String resetKey;

    @Size(max = 254)
    @Column(name = "address", length = 254)
    private String address;

    @NotNull
    @NotBlank
    @Size(min = 10, max = 20)
    @Column(name = "phone_number", unique = true, length = 20, nullable = false)
    private String phoneNumber;

    @Size(max = 20)
    @Column(name = "identity_card_number", length = 20)
    private String identityCardNumber;

    @Column(name = "birthday")
    private Date birthday;

    @Column(name = "sex")
    private Boolean sex;

    @Size(max = 50)
    @Column(name = "nations", length = 50)
    private String nations;

    @Size(max = 254)
    @Column(name = "address1", length = 254)
    private String address1;

    @Column(name = "date_signed")
    private Timestamp dateSigned;

    @Column(name = "date_identity_card_number")
    private Date dateIdentityCardNumber;

    @Size(max = 100)
    @Column(name = "location_identity_card_number", length = 100)
    private String locationIdentityCardNumber;

    @OneToMany(mappedBy = "user")
    private Set<Tuition> tuitions = new HashSet<>();

    @JsonIgnore
    @ManyToMany
    @JoinTable(
            name = "user_authority",
            joinColumns = {@JoinColumn(name = "user_id", referencedColumnName = "id")},
            inverseJoinColumns = {@JoinColumn(name = "authority_name", referencedColumnName = "name")})

    @BatchSize(size = 20)
    private Set<Authority>  authorities = new HashSet<>();


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLogin() {
        return login;
    }

    // Lowercase the login before saving it in database
    public void setLogin(String login) {
        this.login = StringUtils.upperCase(login, Locale.ENGLISH);
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public boolean getActivated() {
        return activated;
    }

    public String getActivationKey() {
        return activationKey;
    }

    public void setActivationKey(String activationKey) {
        this.activationKey = activationKey;
    }

    public String getResetKey() {
        return resetKey;
    }

    public void setResetKey(String resetKey) {
        this.resetKey = resetKey;
    }

    public String getLangKey() {
        return langKey;
    }

    public void setLangKey(String langKey) {
        this.langKey = langKey;
    }

    public Set<Authority> getAuthorities() {
        return authorities;
    }

    public void setAuthorities(Set<Authority> authorities) {
        this.authorities = authorities;
    }

    public boolean isActivated() {
        return activated;
    }

    public void setActivated(boolean activated) {
        this.activated = activated;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getIdentityCardNumber() {
        return identityCardNumber;
    }

    public void setIdentityCardNumber(String identityCardNumber) {
        this.identityCardNumber = identityCardNumber;
    }

    public Date getBirthday() {
        return birthday;
    }

    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }

    public Boolean getSex() {
        return sex;
    }

    public void setSex(Boolean sex) {
        this.sex = sex;
    }

    public String getNations() {
        return nations;
    }

    public void setNations(String nations) {
        this.nations = nations;
    }

    public String getAddress1() {
        return address1;
    }

    public void setAddress1(String address1) {
        this.address1 = address1;
    }

    public Timestamp getDateSigned() {
        return dateSigned;
    }

    public void setDateSigned(Timestamp dateSigned) {
        this.dateSigned = dateSigned;
    }

    public Date getDateIdentityCardNumber() {
        return dateIdentityCardNumber;
    }

    public void setDateIdentityCardNumber(Date dateIdentityCardNumber) {
        this.dateIdentityCardNumber = dateIdentityCardNumber;
    }

    public String getLocationIdentityCardNumber() {
        return locationIdentityCardNumber;
    }

    public void setLocationIdentityCardNumber(String locationIdentityCardNumber) {
        this.locationIdentityCardNumber = locationIdentityCardNumber;
    }

    public Set<Tuition> getTuitions() {
        return tuitions;
    }

    public void setTuitions(Set<Tuition> tuitions) {
        this.tuitions = tuitions;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        User user = (User) o;
        return !(user.getId() == null || getId() == null) && Objects.equals(getId(), user.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", login='" + login + '\'' +
                ", password='" + password + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", activated=" + activated +
                ", langKey='" + langKey + '\'' +
                ", imageUrl='" + imageUrl + '\'' +
                ", activationKey='" + activationKey + '\'' +
                ", resetKey='" + resetKey + '\'' +
                ", address='" + address + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", identityCardNumber='" + identityCardNumber + '\'' +
                ", birthday=" + birthday +
                ", sex=" + sex +
                ", nations='" + nations + '\'' +
                ", address1='" + address1 + '\'' +
                ", dateSigned=" + dateSigned +
                ", dateIdentityCardNumber=" + dateIdentityCardNumber +
                ", locationIdentityCardNumber='" + locationIdentityCardNumber + '\'' +
                ", authorities=" + authorities +
                '}';
    }
}
