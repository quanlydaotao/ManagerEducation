package com.huyduc.manage.service.mapper;

import com.huyduc.manage.bean.District;
import com.huyduc.manage.service.dto.DistrictDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.List;

/**
 * Mapper for the entity District and its DTO called DistrictDTO.
 */
@Mapper(componentModel = "spring", uses = {ProvinceMapper.class})
public interface DistrictMapper extends EntityMapper<DistrictDTO, District> {
    DistrictMapper INSTANCE = Mappers.getMapper(DistrictMapper.class);

    @Mapping(source = "province.id", target = "provinceId")
    DistrictDTO toDto(District district);

    List<DistrictDTO> toDto(List<District> districtList);

    @Mapping(source = "provinceId", target = "province")
    District toEntity(DistrictDTO districtDTO);

    List<District> toEntity(List<DistrictDTO> districtDTOS);

    default District fromId(String id) {
        if (id == null) {
            return null;
        }
        District district = new District();
        district.setId(id);
        return district;
    }
}


