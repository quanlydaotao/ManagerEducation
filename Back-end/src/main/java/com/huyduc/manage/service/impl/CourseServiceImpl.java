package com.huyduc.manage.service.impl;

import com.huyduc.manage.repository.CourseRepository;
import com.huyduc.manage.service.CourseService;
import com.huyduc.manage.service.dto.CourseDTO;
import com.huyduc.manage.service.mapper.CourseMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * Service Implementation for managing Course.
 */
@Service
@Transactional
public class CourseServiceImpl implements CourseService {

    private final Logger log = LoggerFactory.getLogger(YearsServiceImpl.class);
    private final CourseRepository courseRepository;

    public CourseServiceImpl(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    @Override
    public CourseDTO save(CourseDTO courseDTO) {
        return null;
    }

    /**
     * Get all course by id years.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    public Page<CourseDTO> findAllByYearId(Pageable pageable, Long id) {
        log.debug("Request to get all Courses");
        Page<CourseDTO> page = courseRepository.findAllByYearId(pageable, id)
                .map(CourseMapper.INSTANCE::toDto);
        return page;
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
