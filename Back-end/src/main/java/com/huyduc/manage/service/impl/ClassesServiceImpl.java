package com.huyduc.manage.service.impl;

import com.huyduc.manage.bean.Classes;
import com.huyduc.manage.bean.Course;
import com.huyduc.manage.repository.ClassesRepository;
import com.huyduc.manage.repository.CourseRepository;
import com.huyduc.manage.service.ClassesService;
import com.huyduc.manage.service.dto.ClassesDTO;
import com.huyduc.manage.service.mapper.ClassesMapper;
import com.huyduc.manage.web.rest.errors.ClassesAlreadyExistException;
import com.huyduc.manage.web.rest.errors.CourseNotFoundException;
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
    private final ClassesMapper classesMapper;

    public ClassesServiceImpl(ClassesRepository classesRepository, CourseRepository courseRepository, ClassesMapper classesMapper) {
        this.classesRepository = classesRepository;
        this.courseRepository = courseRepository;
        this.classesMapper = classesMapper;
    }

    /**
     * Save a class.
     *
     * @param classesDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public ClassesDTO save(ClassesDTO classesDTO) {
        log.debug("Request to save Class : {}", classesDTO);
        Optional<Classes> classExits = classesRepository.findByClassCode(classesDTO.getClassCode());
        if (classExits.isPresent()) {
            throw new ClassesAlreadyExistException();
        }
        Classes classes = classesMapper.toEntity(classesDTO);
        Optional<Course> course = courseRepository.findById(classesDTO.getCourseId());
        if (!course.isPresent()) {
            throw new CourseNotFoundException();
        }
        classes.setCourse(course.get());
        return classesMapper.toDto(classesRepository.save(classes));
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
                .map(classesMapper::toDto)
                .collect(Collectors.toList());
        return list;
    }

    /**
     * Update all information for class and return information after updated
     *
     * @param classesDTO year to update
     * @return updated class
     */
    @Override
    public Optional<ClassesDTO> updateClass(ClassesDTO classesDTO) {
        return Optional.of(classesRepository
                .findById(classesDTO.getId()))
                .filter(Optional::isPresent)
                .map(Optional::get)
                .map(classes -> {
                    Optional<Classes> classIsExist = classesRepository.findByClassCode(classesDTO.getClassCode());
                    if (classIsExist.isPresent() && classIsExist.get().getId() != classesDTO.getId()) {
                        throw new ClassesAlreadyExistException();
                    }
                    Classes classes1 = classesMapper.toEntity(classesDTO);
                    classes1.setCourse(classes.getCourse());
                    log.debug("Changed Information for Class: {}", classesDTO);
                    return classesMapper.toDto(classesRepository.save(classes1));
                });
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
                .map(classesMapper::toDto);
    }

    /**
     * Delete the class by id.
     *
     * @param ids the list id of the entity
     * @return the count is total all id deleted
     */
    @Override
    public AtomicInteger delete(List<Long> ids) {
        AtomicInteger count = new AtomicInteger();
        ids.forEach(id -> {
            classesRepository.findById(id).ifPresent(cls -> {
                classesRepository.delete(cls);
                count.getAndIncrement();
                log.debug("Deleted Class: {}", cls);
            });
        });
        return count;
    }
}
