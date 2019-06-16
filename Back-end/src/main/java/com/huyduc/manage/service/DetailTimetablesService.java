package com.huyduc.manage.service;

import com.huyduc.manage.service.dto.DetailTimetableDTO;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * Service Interface for managing DetailTimetables
 */
public interface DetailTimetablesService {

    /**
     * Save a detail timetables.
     *
     * @param detailTimetableDTO the entity to save
     * @return the persisted entity
     */

    DetailTimetableDTO save(DetailTimetableDTO detailTimetableDTO);

    /**
     * Get all the detail timetables.
     *
     * @return the list of entities
     */
    List<DetailTimetableDTO> findAll();

    /**
     * Update the detail timetables.
     *
     * @param detailTimetableDTO the pagination information
     * @return the entity after updated
     */
    Optional<DetailTimetableDTO> update(DetailTimetableDTO detailTimetableDTO);


    /**
     * Get the "id" detail timetables.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<DetailTimetableDTO> findOne(Long id);


    /**
     * Delete the "ids" detail timetables.
     *
     * @param ids the ids of the entities
     * @return the count is total all id deleted
     */
    AtomicInteger delete(List<Long> ids);
}
