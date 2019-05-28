package com.huyduc.manage.service.impl;

import com.huyduc.manage.bean.Years;
import com.huyduc.manage.repository.YearsRepository;
import com.huyduc.manage.service.YearsService;
import com.huyduc.manage.service.dto.YearsDTO;
import com.huyduc.manage.service.mapper.YearsMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;


/**
 * Service Implementation for managing Years.
 */
@Service
@Transactional
public class YearsServiceImpl implements YearsService {

    private final Logger log = LoggerFactory.getLogger(YearsServiceImpl.class);
    private final YearsRepository yearsRepository;

    public YearsServiceImpl(YearsRepository yearsRepository) {
        this.yearsRepository = yearsRepository;
    }

    /**
     * Save a years.
     *
     * @param yearsDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public YearsDTO save(YearsDTO yearsDTO) {
        log.debug("Request to save Years : {}", yearsDTO);
        Years year = YearsMapper.INSTANCE.toEntity(yearsDTO);
        year = yearsRepository.save(year);
        return YearsMapper.INSTANCE.toDto(year);
    }


    /**
     * Get all the years.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    public Page<YearsDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Years");
        Page<YearsDTO> page = yearsRepository.findAll(pageable)
                .map(YearsMapper.INSTANCE::toDto);
        return page;
    }


    /**
     * Get one years by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    public Optional<YearsDTO> findOne(Long id) {
        return Optional.empty();
    }


    /**
     * Delete the years by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {

    }
}
