package com.huyduc.manage.service;

import com.huyduc.manage.service.dto.ClassesDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * Service Interface for managing Class
 */
public interface ClassesService {
    /**
     * Save a class.
     *
     * @param classesDTO the entity to save
     * @param courseId the id course
     * @return the persisted entity
     */
    ClassesDTO save(ClassesDTO classesDTO, Long courseId);

    /**
     * Get all classes.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<ClassesDTO> findAll(Pageable pageable);


    /**
     * Get all classes by course id.
     *
     * @param id the id course of class
     * @return the list of entities
     */
    List<ClassesDTO> findAllClassesByCourseId(Long id);


    /**
     * Update the class.
     *
     * @param classesDTO the pagination information
     * @return the entity after updated
     */
    Optional<ClassesDTO> updateClass(ClassesDTO classesDTO);


    /**
     * Get the "id" class.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<ClassesDTO> findOne(Long id);


    /**
     * Delete the "id" class.
     *
     * @param ids the id of the entity
     * @return the count is total all id deleted
     */
    AtomicInteger delete(List<Long> ids);
}
