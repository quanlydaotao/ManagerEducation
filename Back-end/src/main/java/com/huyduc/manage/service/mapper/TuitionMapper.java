package com.huyduc.manage.service.mapper;

import com.huyduc.manage.bean.Tuition;
import com.huyduc.manage.service.dto.TuitionDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.List;

/**
 * Mapper for the entity Tuition and its DTO called TuitionDTO.
 */
@Mapper(componentModel = "spring", uses = {DetailTimetablesMapper.class, UserMapper.class})
public interface TuitionMapper extends EntityMapper<TuitionDTO, Tuition> {
    TuitionMapper INSTANCE = Mappers.getMapper(TuitionMapper.class);

    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "detailTimetable.id", target = "detailTimetableId")
    TuitionDTO toDto(Tuition tuition);

    List<TuitionDTO> toDto(List<Tuition> tuitions);

    @Mapping(source = "userId", target = "user")
    @Mapping(source = "detailTimetableId", target = "detailTimetable")
    Tuition toEntity(TuitionDTO tuitionDTO);

    List<Tuition> toEntity(List<TuitionDTO> tuitionDTOList);

    default Tuition fromId(Long id) {
        if (id == null) {
            return null;
        }
        Tuition tuition = new Tuition();
        tuition.setId(id);
        return tuition;
    }

}
