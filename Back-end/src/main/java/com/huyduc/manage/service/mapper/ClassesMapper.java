package com.huyduc.manage.service.mapper;

import com.huyduc.manage.bean.Classes;
import com.huyduc.manage.service.dto.ClassesDTO;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

/**
 * Mapper for the entity Classes and its DTO called ClassesDTO.
 *
 * Normal mappers are generated using MapStruct, this one is hand-coded as MapStruct
 * support is still in beta, and requires a manual step with an IDE.
 */
@Service
public class ClassesMapper {

    public List<ClassesDTO> classesToClassDTOs(List<Classes> classes) {
        return classes.stream()
                .filter(Objects::nonNull)
                .map(this::classToClassDTO)
                .collect(Collectors.toList());
    }

    public ClassesDTO classToClassDTO(Classes cls) {
        return new ClassesDTO(cls);
    }

    public List<Classes> classDTOsToClasses(List<ClassesDTO> classesDTOs) {
        return classesDTOs.stream()
                .filter(Objects::nonNull)
                .map(this::classDTOToClass)
                .collect(Collectors.toList());
    }

    public Classes classDTOToClass(ClassesDTO classDTO) {
        if (classDTO == null) {
            return null;
        } else {
            Classes cls = new Classes();
            cls.setId(classDTO.getId());
            cls.setName(classDTO.getName());
            cls.setDescribe(classDTO.getDescribe());
            cls.setOpenDay(classDTO.getOpenDay());
            cls.setCloseDay(classDTO.getCloseDay());
            cls.setStatus(classDTO.isStatus());
            cls.setYear(classDTO.getYear());
            cls.setUsers(classDTO.getUsers());
            return cls;
        }
    }
}
