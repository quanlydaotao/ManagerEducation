package com.huyduc.manage.bean;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.Objects;
import java.util.Set;

/**
 * An District.
 */
@Entity
@Table(name = "district")
public class District implements Serializable {

    private String id;
    private String name;
    private String type;
    private Province province;
    private Set<Ward> wards;

    @Id
    @NotNull
    @NotBlank
    @Size(max = 6)
    @Column(name = "id", length = 6, nullable = false)
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    @Basic
    @NotNull
    @NotBlank
    @Size(max = 45)
    @Column(name = "name", length = 45, nullable = false)
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Basic
    @NotNull
    @NotBlank
    @Size(max = 45)
    @Column(name = "type",  length = 45, nullable = false)
    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        District district = (District) o;
        return Objects.equals(id, district.id) &&
                Objects.equals(name, district.name) &&
                Objects.equals(type, district.type);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, type);
    }

    @ManyToOne(fetch = FetchType.EAGER)
    public Province getProvince() {
        return province;
    }

    public void setProvince(Province province) {
        this.province = province;
    }

    @OneToMany(mappedBy = "district", fetch = FetchType.LAZY)
    public Set<Ward> getWards() {
        return wards;
    }

    public void setWards(Set<Ward> wards) {
        this.wards = wards;
    }
}
