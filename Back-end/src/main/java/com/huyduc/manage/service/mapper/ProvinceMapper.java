package com.huyduc.manage.service.mapper;

import com.huyduc.manage.bean.Province;
import com.huyduc.manage.service.dto.ProvinceDTO;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

/**
 * Mapper for the entity Province and its DTO called ProvinceDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ProvinceMapper extends EntityMapper<ProvinceDTO, Province>{
    ProvinceMapper INSTANCE = Mappers.getMapper(ProvinceMapper.class);

    default Province fromId(String id) {
        if (id == null) {
            return null;
        }
        Province province = new Province();
        province.setId(id);
        return province;
    }
}
