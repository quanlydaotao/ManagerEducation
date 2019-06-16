package com.huyduc.manage.service;

import com.huyduc.manage.service.dto.TimetablesDTO;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * Service Interface for managing Timetables
 */
public interface TimetablesService {
    /**
     * Save a Timetables.
     *
     * @param timetablesDTO the entity to save
     * @return the persisted entity
     */
    TimetablesDTO save(TimetablesDTO timetablesDTO);

    /**
     * Get all the timetables.
     *
     * @return the list of entities
     */
    List<TimetablesDTO> findAll();

    /**
     * Update the timetables.
     *
     * @param timetablesDTO the pagination information
     * @return the entity after updated
     */
    Optional<TimetablesDTO> update(TimetablesDTO timetablesDTO);


    /**
     * Get the "id" timetables.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<TimetablesDTO> findOne(Long id);


    /**
     * Delete the "ids" timetables.
     *
     * @param ids the ids of the entities
     * @return the count is total all id deleted
     */
    AtomicInteger delete(List<Long> ids);
}
