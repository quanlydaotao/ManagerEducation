package com.huyduc.manage.service.impl;

import com.huyduc.manage.bean.Classes;
import com.huyduc.manage.bean.Course;
import com.huyduc.manage.repository.ClassesRepository;
import com.huyduc.manage.repository.CourseRepository;
import com.huyduc.manage.service.ClassesService;
import com.huyduc.manage.service.dto.ClassesDTO;
import com.huyduc.manage.service.mapper.ClassesMapper;
import com.huyduc.manage.web.rest.errors.ClassesAlreadyExistException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Class.
 */
@Service
@Transactional
public class ClassesServiceImpl implements ClassesService {

    private final Logger log = LoggerFactory.getLogger(ClassesServiceImpl.class);
    private final ClassesRepository classesRepository;
    private final CourseRepository courseRepository;

    public ClassesServiceImpl(ClassesRepository classesRepository, CourseRepository courseRepository) {
        this.classesRepository = classesRepository;
        this.courseRepository = courseRepository;
    }

    /**
     * Save a class.
     *
     * @param classesDTO the entity to save
     * @param courseId the id course
     * @return the persisted entity
     */
    @Override
    public ClassesDTO save(ClassesDTO classesDTO, Long courseId) {
        log.debug("Request to save Class : {}", classesDTO);
        Optional<Classes> classExits = classesRepository.findByName(classesDTO.getName());
        if (classExits.isPresent()) {
            throw new ClassesAlreadyExistException();
        }
        Classes classes = ClassesMapper.INSTANCE.toEntity(classesDTO);
        Course course = courseRepository.findById(courseId).orElseGet(() -> new Course());
        classes.setCourse(course);
        return ClassesMapper.INSTANCE.toDto(classesRepository.save(classes));
    }

    @Override
    public Page<ClassesDTO> findAll(Pageable pageable) {
        return null;
    }

    /**
     * Get all classes by course id.
     *
     * @param id the id course of class
     * @return the list of entities
     */
    @Override
    public List<ClassesDTO> findAllClassesByCourseId(Long id) {
        log.debug("Request to get all Classes");
        List<ClassesDTO> list = classesRepository.findAllByCourseIdOrderByIdDesc(id)
                .stream()
                .map(ClassesMapper.INSTANCE::toDto)
                .collect(Collectors.toList());
        return list;
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
