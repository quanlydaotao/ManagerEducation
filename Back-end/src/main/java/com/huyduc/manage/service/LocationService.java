package com.huyduc.manage.service;

import com.huyduc.manage.repository.DistrictRepository;
import com.huyduc.manage.repository.ProvinceRepository;
import com.huyduc.manage.repository.WardRepository;
import com.huyduc.manage.service.dto.DistrictDTO;
import com.huyduc.manage.service.dto.ProvinceDTO;
import com.huyduc.manage.service.dto.WardDTO;
import com.huyduc.manage.service.mapper.DistrictMapper;
import com.huyduc.manage.service.mapper.ProvinceMapper;
import com.huyduc.manage.service.mapper.WardMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Service class for location.
 **/
@Service
@Transactional
public class LocationService {
    private final Logger log = LoggerFactory.getLogger(LocationService.class);

    private final ProvinceRepository provinceRepository;
    private final DistrictRepository districtRepository;
    private final WardRepository wardRepository;
    private final DistrictMapper districtMapper;
    private final WardMapper wardMapper;

    public LocationService(ProvinceRepository provinceRepository, DistrictRepository districtRepository, WardRepository wardRepository, DistrictMapper districtMapper, WardMapper wardMapper) {
        this.provinceRepository = provinceRepository;
        this.districtRepository = districtRepository;
        this.wardRepository = wardRepository;
        this.districtMapper = districtMapper;
        this.wardMapper = wardMapper;
    }

    /**
     * Get all the province.
     *
     * @return the list of entities
     */
    @Transactional
    public List<ProvinceDTO> getAllProvince() {
        log.debug("Request to get all Province");
        List<ProvinceDTO> list = provinceRepository.findAll(Sort.by("name").ascending())
                .stream()
                .map(province -> ProvinceMapper.INSTANCE.toDto(province))
                .collect(Collectors.toList());
        return list;
    }

    /**
     * Get all the district.
     *
     * @return the list of entities
     */
    @Transactional
    public List<DistrictDTO> getAllDistrictByProvinceId(String provinceId) {
        log.debug("Request to get all District by province ID");
        List<DistrictDTO> list = districtRepository.getAllByProvinceIdOrderByNameAsc(provinceId)
                .stream()
                .map(district -> districtMapper.toDto(district))
                .collect(Collectors.toList());
        return list;
    }


    /**
     * Get all the ward.
     *
     * @return the list of entities
     */
    @Transactional
    public List<WardDTO> getAllWarByDistrictId(String districtId) {
        log.debug("Request to get all Ward by district ID");
        List<WardDTO> list = wardRepository.getAllByDistrictIdOrderByNameAsc(districtId)
                .stream()
                .map(ward -> wardMapper.toDto(ward))
                .collect(Collectors.toList());
        return list;
    }
}
