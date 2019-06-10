package com.huyduc.manage.web.rest;

import com.huyduc.manage.security.AuthoritiesConstants;
import com.huyduc.manage.service.CourseService;
import com.huyduc.manage.service.dto.CourseDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * REST controller for managing the course.
 */
@RestController
@RequestMapping("/api")
public class CourseResource {
    private final CourseService courseService;

    public CourseResource(CourseService courseService) {
        this.courseService = courseService;
    }

    /**
     * GET /course?year=:id&filter=(true|false) : get all course by year id and filter
     *
     * @return the ResponseEntity with status 200 (OK) and with body all course by year id
     */
    @GetMapping("/course")
    @PreAuthorize("hasRole(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity<List<CourseDTO>> getAllCourseByYearId(@RequestParam(name = "year", required = true, defaultValue = "0") Long id, @RequestParam(name = "filter", required = true, defaultValue = "false") boolean filter) {
        final List<CourseDTO> list = courseService.findAllByYearIdAndFilter(id, filter);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }
}
