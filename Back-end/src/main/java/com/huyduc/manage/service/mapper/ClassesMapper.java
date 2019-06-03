package com.huyduc.manage.service.mapper;

import com.huyduc.manage.bean.Classes;
import com.huyduc.manage.service.dto.ClassesDTO;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

/**
 * Mapper for the entity Classes and its DTO called ClassesDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ClassesMapper extends EntityMapper<ClassesDTO, Classes> {
    ClassesMapper INSTANCE = Mappers.getMapper(ClassesMapper.class);

    default Classes fromId(Long id) {
        if (id == null) {
            return null;
        }
        Classes classes = new Classes();
        classes.setId(id);
        return classes;
    }
}
