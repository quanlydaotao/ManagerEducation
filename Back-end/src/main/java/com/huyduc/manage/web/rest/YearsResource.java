package com.huyduc.manage.web.rest;

import com.huyduc.manage.security.AuthoritiesConstants;
import com.huyduc.manage.service.YearsService;
import com.huyduc.manage.service.dto.YearsDTO;
import com.huyduc.manage.web.rest.errors.BadRequestAlertException;
import com.huyduc.manage.web.rest.errors.YearAlreadyExistException;
import com.huyduc.manage.web.rest.util.HeaderUtil;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.net.URISyntaxException;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing the school years.
 */
@RestController
@RequestMapping("/api")
public class YearsResource {

    private final YearsService yearsService;
    private static final String ENTITY_NAME = "years";

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
        return new ResponseEntity<>(page.getContent(), HttpStatus.OK);
    }

    /**
     * POST  /years: Create a new years.
     *
     * @param yearsDTO the yearsDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new yearsDTO, or with status 400 (Bad Request) if the years has already or not created.
     * @throws URISyntaxException if the Location URI syntax is incorrect
     * @throws YearAlreadyExistException 400 (Bad Request) if the year is already in exists
     */
    @PostMapping("/years")
    @PreAuthorize("hasRole(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity<YearsDTO> createYears(@RequestBody YearsDTO yearsDTO) throws URISyntaxException {
        try {
            YearsDTO result = yearsService.save(yearsDTO);
            return new ResponseEntity(result, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity(Collections.singletonMap("createYearFailed",
                    e.getLocalizedMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * PUT  /years : Updates an existing year.
     *
     * @param yearsDTO the yearsDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated yearsDTO,
     * or with status 400 (Bad Request) if the yearsDTO is not valid and not update,
     * @throws URISyntaxException if the Location URI syntax is incorrect
     * @throws YearAlreadyExistException 400 (Bad Request) if the year is already in exists
     */
    @PutMapping("/years")
    @PreAuthorize("hasRole(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity<YearsDTO> updateYears(@RequestBody YearsDTO yearsDTO) throws URISyntaxException {
        try {
            if (yearsDTO.getId() <= 0) {
                return new ResponseEntity(Collections.singletonMap("updateYearFailed", "Năm học đào tạo không tồn tại!"), HttpStatus.BAD_REQUEST);
            }
            Optional<YearsDTO> result = yearsService.updateYear(yearsDTO);
            return ResponseEntity.ok()
                    .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, yearsDTO.getId()+""))
                    .body(result.get());
        } catch (Exception e) {
            return new ResponseEntity(Collections.singletonMap("updateYearFailed",
                    e.getLocalizedMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * GET  /years/:id : get the "id" years.
     *
     * @param id the id of the yearsDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the yearsDTO, or with status 404 (Not Found)
     */
    @GetMapping("/years/{id}")
    @PreAuthorize("hasRole(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity<YearsDTO> getYear(@PathVariable Long id) {
        Optional<YearsDTO> yearDTO = yearsService.findOne(id);
        return ResponseEntity.ok().body(yearDTO.get());
    }

}
