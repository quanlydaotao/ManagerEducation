package com.huyduc.manage.web.rest;

import com.huyduc.manage.security.AuthoritiesConstants;
import com.huyduc.manage.service.LocationService;
import com.huyduc.manage.service.dto.DistrictDTO;
import com.huyduc.manage.service.dto.ProvinceDTO;
import com.huyduc.manage.service.dto.WardDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Location resources for managing the location
 */
@RestController
@RequestMapping("/api")
public class LocationResources {
    private final LocationService locationService;

    public LocationResources(LocationService locationService) {
        this.locationService = locationService;
    }

    @GetMapping("/location/provinces")
    @PreAuthorize("hasRole(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity<List<ProvinceDTO>> getProvince() {
        final List<ProvinceDTO> provinceDTOList = locationService.getAllProvince();
        return new ResponseEntity<>(provinceDTOList, HttpStatus.OK);
    }

    @GetMapping("/location/districts/pro/{id}")
    @PreAuthorize("hasRole(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity<List<DistrictDTO>> getDistrict(@PathVariable(name = "id") String id) {
        final List<DistrictDTO> districtDTOS = locationService.getAllDistrictByProvinceId(id);
        return new ResponseEntity<>(districtDTOS, HttpStatus.OK);
    }

    @GetMapping("/location/wards/str/{id}")
    @PreAuthorize("hasRole(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity<List<WardDTO>> getWard(@PathVariable(name = "id") String id) {
        final List<WardDTO> wardDTOS = locationService.getAllWarByDistrictId(id);
        return new ResponseEntity<>(wardDTOS, HttpStatus.OK);
    }


}
