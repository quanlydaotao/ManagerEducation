package com.huyduc.manage.service.dto;

import com.huyduc.manage.bean.Authority;
import com.huyduc.manage.bean.User;
import com.huyduc.manage.config.Constants;

import javax.validation.constraints.*;
import java.sql.Date;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * A DTO representing a user, with his authorities.
 */
public class UserDTO {

    private Long id;

    @NotNull
    @NotBlank
    @Pattern(regexp = Constants.LOGIN_REGEX)
    @Size(min = 7, max = 50)
    private String login;

    @Size(max = 50)
    private String firstName;

    @Size(max = 50)
    private String lastName;

    @Email
    @Size(max = 254)
    private String email;

    @Size(max = 254)
    private String address;

    @Size(max = 256)
    private String imageUrl;

    @NotNull
    @NotBlank
    @Size(min = 10, max = 20)
    @Pattern(regexp = "^(03[2|3|4|5|6|7|8|9]|07[0|6|7|8|9]|08[1|2|3|4|5]|05[6|8|9])[0-9]{7}$")
    private String phoneNumber;

    @Size(max = 20)
    private String identityCardNumber;

    private Date birthday;

    private Date dateSigned;

    private Boolean sex;

    @Size(max = 50)
    private String nations;

    @Size(max = 254)
    private String address1;

    private boolean activated = true;

    @Size(min = 2, max = 6)
    private String langKey;

    private Set<String> authorities;

    public UserDTO() {
        // Empty constructor needed for Jackson.
    }

    public UserDTO(User user) {
        this.id = user.getId();
        this.login = user.getLogin();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.email = user.getEmail();
        this.imageUrl = user.getImageUrl();
        this.address = user.getAddress();
        this.phoneNumber = user.getPhoneNumber();
        this.identityCardNumber = user.getIdentityCardNumber();
        this.birthday = user.getBirthday();
        this.dateSigned = user.getDateSigned();
        this.sex = user.getSex();
        this.nations = user.getNations();
        this.address1 = user.getAddress1();
        this.activated = user.getActivated();
        this.langKey = user.getLangKey();
        this.authorities = user.getAuthorities().stream()
                .map(Authority::getName)
                .collect(Collectors.toSet());
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
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

    public boolean isActivated() {
        return activated;
    }

    public void setActivated(boolean activated) {
        this.activated = activated;
    }

    public String getLangKey() {
        return langKey;
    }

    public void setLangKey(String langKey) {
        this.langKey = langKey;
    }

    public Set<String> getAuthorities() {
        return authorities;
    }

    public void setAuthorities(Set<String> authorities) {
        this.authorities = authorities;
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

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Date getDateSigned() {
        return dateSigned;
    }

    public void setDateSigned(Date dateSigned) {
        this.dateSigned = dateSigned;
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
        return "UserDTO{" +
                "id=" + id +
                ", login='" + login + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", address='" + address + '\'' +
                ", imageUrl='" + imageUrl + '\'' +
                ", phone_number='" + phoneNumber + '\'' +
                ", identity_card_number='" + identityCardNumber + '\'' +
                ", birthday=" + birthday +
                ", dateSigned=" + dateSigned +
                ", sex=" + sex +
                ", nations='" + nations + '\'' +
                ", address1='" + address1 + '\'' +
                ", activated=" + activated +
                ", langKey='" + langKey + '\'' +
                ", authorities=" + authorities +
                '}';
    }
}
