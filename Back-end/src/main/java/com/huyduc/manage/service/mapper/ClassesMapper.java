package com.huyduc.manage.service.mapper;

import com.huyduc.manage.bean.Classes;
import com.huyduc.manage.service.dto.ClassesDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.List;

/**
 * Mapper for the entity Classes and its DTO called ClassesDTO.
 */
@Mapper(componentModel = "spring", uses = {YearsMapper.class})
public interface ClassesMapper {

    ClassesMapper INSTANCE = Mappers.getMapper(ClassesMapper.class);

    @Mapping(source = "year.id", target = "idYear")
    ClassesDTO toDto(Classes classes);

    List<ClassesDTO> toDto(List<Classes> classes);

    @Mapping(source = "idYear", target = "year")
    Classes toEntity(ClassesDTO classesDTO);

    default Classes fromId(Long id) {
        if (id == null) {
            return null;
        }
        Classes classes = new Classes();
        classes.setId(id);
        return classes;
    }
}
