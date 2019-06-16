package com.huyduc.manage.service.mapper;

import com.huyduc.manage.bean.DetailTimetables;
import com.huyduc.manage.service.dto.DetailTimetableDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.List;

/**
 * Mapper for the entity DetailTimetables and its DTO called DetailTimetablesDTO.
 */
@Mapper(componentModel = "spring", uses = {TimetablesMapper.class})
public interface DetailTimetablesMapper extends EntityMapper<DetailTimetableDTO, DetailTimetables> {
    DetailTimetablesMapper INSTANCE = Mappers.getMapper(DetailTimetablesMapper.class);

    @Mapping(source = "timetable.id", target = "timetableId")
    DetailTimetableDTO toDto(DetailTimetables detailTimetables);

    List<DetailTimetableDTO> toDto(List<DetailTimetables> detailTimetablesList);

    @Mapping(source = "timetableId", target = "timetable")
    DetailTimetables toEntity(DetailTimetableDTO detailTimetableDTO);

    List<DetailTimetables> toEntity(List<DetailTimetableDTO> classesDTOList);

    default DetailTimetables fromId(Long id) {
        if (id == null) {
            return null;
        }
        DetailTimetables detailTimetables = new DetailTimetables();
        detailTimetables.setId(id);
        return detailTimetables;
    }

}
