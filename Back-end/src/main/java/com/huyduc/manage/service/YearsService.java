package com.huyduc.manage.service;

import com.huyduc.manage.service.dto.YearsDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * Service Interface for managing Years
 */
public interface YearsService {

    /**
     * Save a years.
     *
     * @param yearsDTO the entity to save
     * @return the persisted entity
     */
    YearsDTO save(YearsDTO yearsDTO);

    /**
     * Get all the years.
     *
     * @param status the status year
     * @return the list of entities
     */
    List<YearsDTO> findAll(boolean status);

    /**
     * Update the years.
     *
     * @param yearDTO the pagination information
     * @return the entity after updated
     */
    Optional<YearsDTO> updateYear(YearsDTO yearDTO);


    /**
     * Get the "id" years.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<YearsDTO> findOne(Long id);


    /**
     * Delete the "ids" years.
     *
     * @param ids the ids of the entity
     * @return the count is total all id deleted
     */
    AtomicInteger delete(List<Long> ids);

}
