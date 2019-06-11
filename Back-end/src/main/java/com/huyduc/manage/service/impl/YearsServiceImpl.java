package com.huyduc.manage.service.impl;

import com.huyduc.manage.bean.Years;
import com.huyduc.manage.repository.YearsRepository;
import com.huyduc.manage.service.YearsService;
import com.huyduc.manage.service.dto.YearsDTO;
import com.huyduc.manage.service.mapper.YearsMapper;
import com.huyduc.manage.web.rest.errors.InvalidPasswordException;
import com.huyduc.manage.web.rest.errors.YearAlreadyExistException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;


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
        Optional<Years> yearExits = yearsRepository.findOneByStartYears(yearsDTO.getStartYears());
        if (yearExits.isPresent()) {
            throw new YearAlreadyExistException();
        }
        Years year = YearsMapper.INSTANCE.toEntity(yearsDTO);
        return YearsMapper.INSTANCE.toDto(yearsRepository.save(year));
    }


    /**
     * Update all information for year and return information after updated
     *
     * @param yearDTO year to update
     * @return updated year
     */
    public Optional<YearsDTO> updateYear(YearsDTO yearDTO) {
        return Optional.of(yearsRepository
                .findById(yearDTO.getId()))
                .filter(Optional::isPresent)
                .map(Optional::get)
                .map(years -> {
                    Optional<Years> yearIsExist = yearsRepository.findOneByStartYears(yearDTO.getStartYears());
                    if (yearIsExist.isPresent() && yearIsExist.get().getId() != yearDTO.getId()) {
                        throw new YearAlreadyExistException();
                    }
                    Years years1 = yearsRepository.save(YearsMapper.INSTANCE.toEntity(yearDTO));
                    log.debug("Changed Information for Year: {}", yearDTO);
                    return YearsMapper.INSTANCE.toDto(years1);
                });
    }


    /**
     * Get all the years.
     *
     * @param status the status year
     * @return the list of entities
     */
    @Override
    public List<YearsDTO> findAll(boolean status) {
        log.debug("Request to get all Years");
        List<YearsDTO> list = new ArrayList<>();
        if (!status) {
            list = yearsRepository.findAll(Sort.by("startYears").descending())
                .stream()
                .map(years -> YearsMapper.INSTANCE.toDto(years))
                .collect(Collectors.toList());
            return list;
        }
        list = yearsRepository.findAllByStatusIsTrueOrderByStartYearsDesc()
            .stream()
            .map(years -> YearsMapper.INSTANCE.toDto(years))
            .collect(Collectors.toList());
        return list;

    }


    /**
     * Get one years by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    public Optional<YearsDTO> findOne(Long id) {
        log.debug("Request to get Year : {}", id);
        return yearsRepository.findById(id)
                .map(YearsMapper.INSTANCE::toDto);
    }

    /**
     * Delete the years by id.
     *
     * @param ids the list id of the entity
     * @return the count is total all id deleted
     */
    @Override
    public AtomicInteger delete(List<Long> ids) {
        AtomicInteger count = new AtomicInteger();
        ids.forEach(id -> {
            yearsRepository.findById(id).ifPresent(year -> {
                yearsRepository.delete(year);
                count.getAndIncrement();
                log.debug("Deleted Year: {}", year);
            });
        });
        return count;
    }
}
