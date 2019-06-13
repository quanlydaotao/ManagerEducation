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
@Mapper(componentModel = "spring", uses = {CourseMapper.class})
public interface ClassesMapper extends EntityMapper<ClassesDTO, Classes> {
    ClassesMapper INSTANCE = Mappers.getMapper(ClassesMapper.class);

    @Mapping(source = "course.id", target = "courseId")
    ClassesDTO toDto(Classes classes);

    List<ClassesDTO> toDto(List<Classes> classesList);

    @Mapping(source = "courseId", target = "course")
    Classes toEntity(ClassesDTO classesDTO);

    List<Classes> toEntity(List<ClassesDTO> classesDTOList);

    default Classes fromId(Long id) {
        if (id == null) {
            return null;
        }
        Classes classes = new Classes();
        classes.setId(id);
        return classes;
    }
}
