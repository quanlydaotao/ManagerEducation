package com.huyduc.manage.service.mapper;

import com.huyduc.manage.bean.Course;
import com.huyduc.manage.service.dto.CourseDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.List;

/**
 * Mapper for the entity Course and its DTO called CourseDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface CourseMapper extends EntityMapper<CourseDTO, Course>{
    CourseMapper INSTANCE = Mappers.getMapper(CourseMapper.class);

    default Course fromId(Long id) {
        if (id == null) {
            return null;
        }
        Course course = new Course();
        course.setId(id);
        return course;
    }
}
