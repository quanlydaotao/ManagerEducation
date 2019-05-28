package com.huyduc.manage.service.mapper;

import com.huyduc.manage.bean.Years;
import com.huyduc.manage.service.dto.YearsDTO;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

/**
 * Mapper for the entity Years and its DTO called YearsDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface YearsMapper extends EntityMapper<YearsDTO, Years> {

    YearsMapper INSTANCE = Mappers.getMapper(YearsMapper.class);

    default Years fromId(Long id) {
        if (id == null) {
            return null;
        }
        Years years = new Years();
        years.setId(id);
        return years;
    }

}
