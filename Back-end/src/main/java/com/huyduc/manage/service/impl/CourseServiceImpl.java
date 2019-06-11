package com.huyduc.manage.service.impl;

import com.huyduc.manage.repository.ClassesRepository;
import com.huyduc.manage.repository.CourseRepository;
import com.huyduc.manage.service.CourseService;
import com.huyduc.manage.service.dto.CourseDTO;
import com.huyduc.manage.service.mapper.CourseMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Course.
 */
@Service
@Transactional
public class CourseServiceImpl implements CourseService {

    private final Logger log = LoggerFactory.getLogger(YearsServiceImpl.class);
    private final CourseRepository courseRepository;
    private final ClassesRepository classesRepository;

    public CourseServiceImpl(CourseRepository courseRepository, ClassesRepository classesRepository) {
        this.courseRepository = courseRepository;
        this.classesRepository = classesRepository;
    }

    @Override
    public CourseDTO save(CourseDTO courseDTO) {
        return null;
    }

    /**
     * Get all course by id years.
     *
     * @param id     the id year of course
     * @param filter the filter data by max class
     * @return the list of entities
     */
    @Override
    public List<CourseDTO> findAllByYearIdAndFilter(Long id, boolean filter) {
        log.debug("Request to get all Courses");
        List<CourseDTO> data = courseRepository.findAllByYearIdOrderByIdDesc(id)
                .stream()
                .map(CourseMapper.INSTANCE::toDto)
                .collect(Collectors.toList());
        if (filter) {
            List<CourseDTO> dataFilter = new ArrayList<>();
            data.forEach(item -> {
                if (item.isStatus()) {
                    Integer count = classesRepository.countByCourseId(item.getId());
                    if (count < item.getMaxClasses() && item.isStatus()) {
                        dataFilter.add(item);
                    }
                }
            });
            return dataFilter;
        }
        return data;
    }

    @Override
    public Optional<CourseDTO> updateCourse(CourseDTO courseDTO) {
        return Optional.empty();
    }

    @Override
    public Optional<CourseDTO> findOne(Long id) {
        return Optional.empty();
    }

    @Override
    public AtomicInteger delete(List<Long> ids) {
        return null;
    }
}
