package com.huyduc.manage.web.rest;

import com.huyduc.manage.security.AuthoritiesConstants;
import com.huyduc.manage.service.YearsService;
import com.huyduc.manage.service.dto.YearsDTO;
import com.huyduc.manage.web.rest.util.PaginationUtil;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.net.URISyntaxException;
import java.util.Collections;
import java.util.List;

/**
 * REST controller for managing the school years.
 */
@RestController
@RequestMapping("/api")
public class YearsResource {

    private final YearsService yearsService;

    public YearsResource(YearsService yearsService) {
        this.yearsService = yearsService;
    }

    /**
     * GET /years : get all years.
     *
     * @return the ResponseEntity with status 200 (OK) and with body all years
     */
    @GetMapping("/years")
    @PreAuthorize("hasRole(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity<List<YearsDTO>> getAllYears() {
        final Page<YearsDTO> page = yearsService.findAll(PageRequest.of(0, 10000000, Sort.by("id").descending()));
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/years");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * POST  /years: Create a new years.
     *
     * @param yearsDTO the yearsDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new yearsDTO, or with status 400 (Bad Request) if the years has already or not created.
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/years")
    public ResponseEntity<YearsDTO> createYears(@RequestBody YearsDTO yearsDTO) throws URISyntaxException {
        try {
            YearsDTO result = yearsService.save(yearsDTO);
            return new ResponseEntity(result, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity(Collections.singletonMap("createYearFailed",
                    "Tạo năm học thất bại!"), HttpStatus.BAD_REQUEST);
        }
    }

}
