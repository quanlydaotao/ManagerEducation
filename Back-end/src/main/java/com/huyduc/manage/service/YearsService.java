package com.huyduc.manage.service;

import com.huyduc.manage.service.dto.YearsDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

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
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<YearsDTO> findAll(Pageable pageable);


    /**
     * Get the "id" years.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<YearsDTO> findOne(Long id);

    /**
     * Delete the "id" years.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

}
