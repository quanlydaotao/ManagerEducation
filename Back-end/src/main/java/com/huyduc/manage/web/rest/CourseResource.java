package com.huyduc.manage.web.rest;

import com.huyduc.manage.security.AuthoritiesConstants;
import com.huyduc.manage.service.CourseService;
import com.huyduc.manage.service.dto.CourseDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
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
     * GET /course/year/:id : get all course by year id
     *
     * @return the ResponseEntity with status 200 (OK) and with body all course by year id
     */
    @GetMapping("/course/year/{id}")
    @PreAuthorize("hasRole(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity<List<CourseDTO>> getAllCourseByYearId(@PathVariable("id") Long id) {
        final Page<CourseDTO> page = courseService.findAllByYearId(PageRequest
                .of(0, 10000000, Sort.by("id").descending()), id);
        return new ResponseEntity<>(page.getContent(), HttpStatus.OK);
    }
}
