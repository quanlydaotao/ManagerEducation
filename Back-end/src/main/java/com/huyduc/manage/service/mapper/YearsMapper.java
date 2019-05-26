package com.huyduc.manage.service.mapper;
import com.huyduc.manage.bean.Years;
import com.huyduc.manage.service.dto.YearsDTO;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

/**
 * Mapper for the entity Years and its DTO called YearsDTO.
 *
 * Normal mappers are generated using MapStruct, this one is hand-coded as MapStruct
 * support is still in beta, and requires a manual step with an IDE.
 */
@Service
public class YearsMapper {
    public List<YearsDTO> yearsToYearDTOs(List<Years> years) {
        return years.stream()
                .filter(Objects::nonNull)
                .map(this::yearToYearDTO)
                .collect(Collectors.toList());
    }

    public YearsDTO yearToYearDTO(Years year) {
        return new YearsDTO(year);
    }

    public List<Years> yearDTOsToYears(List<YearsDTO> userDTOs) {
        return userDTOs.stream()
                .filter(Objects::nonNull)
                .map(this::yearDTOToYear)
                .collect(Collectors.toList());
    }

    public Years yearDTOToYear(YearsDTO yearDTO) {
        if (yearDTO == null) {
            return null;
        } else {
            Years year = new Years();
            year.setId(yearDTO.getId());
            year.setName(yearDTO.getName());
            year.setStartYears(yearDTO.getStartYears());
            year.setEndYears(yearDTO.getEndYears());
            year.setOpenDay(yearDTO.getOpenDay());
            year.setCloseDay(yearDTO.getCloseDay());
            year.setDescribe(yearDTO.getDescribe());
            year.setMaximumClasses(yearDTO.getMaximumClasses());
            year.setStatus(yearDTO.isStatus());
            year.setClasses(yearDTO.getClasses());
            return year;
        }
    }

}
