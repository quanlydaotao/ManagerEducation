package com.huyduc.manage.service.mapper;

import com.huyduc.manage.bean.District;
import com.huyduc.manage.bean.Ward;
import com.huyduc.manage.service.dto.DistrictDTO;
import com.huyduc.manage.service.dto.WardDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.List;

/**
 * Mapper for the entity Ward and its DTO called WardDTO.
 */
@Mapper(componentModel = "spring", uses = {DistrictMapper.class})
public interface WardMapper extends EntityMapper<WardDTO, Ward>{
    WardMapper INSTANCE = Mappers.getMapper(WardMapper.class);

    @Mapping(source = "district.id", target = "districtId")
    WardDTO toDto(Ward ward);

    List<WardDTO> toDto(List<Ward> wards);

    @Mapping(source = "districtId", target = "district")
    Ward toEntity(WardDTO wardDTO);

    List<Ward> toEntity(List<WardDTO> wardDTOS);

    default Ward fromId(String id) {
        if (id == null) {
            return null;
        }
        Ward ward = new Ward();
        ward.setId(id);
        return ward;
    }
}
