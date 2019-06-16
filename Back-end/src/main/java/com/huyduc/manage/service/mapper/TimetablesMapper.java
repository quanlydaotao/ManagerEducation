package com.huyduc.manage.service.mapper;

import com.huyduc.manage.bean.Timetables;
import com.huyduc.manage.service.dto.TimetablesDTO;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

/**
 * Mapper for the entity Timetables and its DTO called TimetablesDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface TimetablesMapper extends EntityMapper<TimetablesDTO, Timetables>{
    TimetablesMapper INSTANCE = Mappers.getMapper(TimetablesMapper.class);

    default Timetables fromId(Long id) {
        if (id == null) {
            return null;
        }
        Timetables timetables = new Timetables();
        timetables.setId(id);
        return timetables;
    }
}
