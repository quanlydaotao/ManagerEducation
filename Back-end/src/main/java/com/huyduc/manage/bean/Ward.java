package com.huyduc.manage.bean;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.Objects;

/**
 * An Ward.
 */
@Entity(name = "ward")
public class Ward implements Serializable {
    private String id;
    private String name;
    private String type;
    private District district;

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
    @Column(name = "type", length = 45, nullable = false)
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
        Ward ward = (Ward) o;
        return Objects.equals(id, ward.id) &&
                Objects.equals(name, ward.name) &&
                Objects.equals(type, ward.type);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, type);
    }

    @ManyToOne(fetch = FetchType.EAGER)
    public District getDistrict() {
        return district;
    }

    public void setDistrict(District district) {
        this.district = district;
    }
}
