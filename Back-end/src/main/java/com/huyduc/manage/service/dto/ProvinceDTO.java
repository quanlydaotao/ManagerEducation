package com.huyduc.manage.service.dto;


import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 * A DTO represents a province.
 */
public class ProvinceDTO {

    private String id;

    @NotNull
    @NotBlank
    @Size(max = 45)
    private String name;

    @NotNull
    @NotBlank
    @Size(max = 45)
    private String type;

    public ProvinceDTO() {
        // Empty constructor needed for Jackson.
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    @Override
    public String toString() {
        return "ProvinceDTO{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", type='" + type + '\'' +
                '}';
    }
}
