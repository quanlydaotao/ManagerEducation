package com.huyduc.manage.service.impl;

import com.huyduc.manage.repository.ClassesRepository;
import com.huyduc.manage.service.ClassesService;
import com.huyduc.manage.service.dto.ClassesDTO;
import com.huyduc.manage.service.mapper.ClassesMapper;
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
 * Service Implementation for managing Class.
 */
@Service
@Transactional
public class ClassesServiceImpl implements ClassesService {

    private final Logger log = LoggerFactory.getLogger(ClassesServiceImpl.class);
    private final ClassesRepository classesRepository;

    public ClassesServiceImpl(ClassesRepository classesRepository) {
        this.classesRepository = classesRepository;
    }

    @Override
    public ClassesDTO save(ClassesDTO classesDTO) {
        return null;
    }

    @Override
    public Page<ClassesDTO> findAll(Pageable pageable) {
        return null;
    }

    /**
     * Get all classes by id course.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    public Page<ClassesDTO> findAllClassesByCourseId(Pageable pageable, Long id) {
        log.debug("Request to get all Classes");
        Page<ClassesDTO> page = classesRepository.findAllByCourseId(pageable, id)
                .map(ClassesMapper.INSTANCE::toDto);
        return page;
    }

    @Override
    public Optional<ClassesDTO> updateClass(ClassesDTO classesDTO) {
        return Optional.empty();
    }

    /**
     * Get one class by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    public Optional<ClassesDTO> findOne(Long id) {
        log.debug("Request to get Class : {}", id);
        return classesRepository.findById(id)
                .map(ClassesMapper.INSTANCE::toDto);
    }

    @Override
    public AtomicInteger delete(List<Long> ids) {
        return null;
    }
}
