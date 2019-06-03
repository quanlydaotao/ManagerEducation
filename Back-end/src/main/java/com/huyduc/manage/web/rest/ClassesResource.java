package com.huyduc.manage.web.rest;

import com.huyduc.manage.security.AuthoritiesConstants;
import com.huyduc.manage.service.ClassesService;
import com.huyduc.manage.service.dto.ClassesDTO;
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
import java.util.Optional;

/**
 * REST controller for managing the class.L
 */
@RestController
@RequestMapping("/api")
public class ClassesResource {
    private final ClassesService classesService;

    public ClassesResource(ClassesService classesService) {
        this.classesService = classesService;
    }

    /**
     * GET /class/course/:id : get all classes by course id
     *
     * @return the ResponseEntity with status 200 (OK) and with body all classes by year id
     */
    @GetMapping("/class/course/{id}")
    @PreAuthorize("hasRole(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity<List<ClassesDTO>> getAllClassesByCourseId(@PathVariable("id") Long id) {
        final Page<ClassesDTO> page = classesService.findAllClassesByCourseId(PageRequest
                .of(0, 10000000, Sort.by("id").descending()), id);
        return new ResponseEntity<>(page.getContent(), HttpStatus.OK);
    }

    /**
     * GET  /class/:id : get the "id" class.
     *
     * @param id the id of the classesDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the classesDTO, or with status 404 (Not Found)
     */
    @GetMapping("/class/{id}")
    @PreAuthorize("hasRole(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity<ClassesDTO> getClass(@PathVariable Long id) {
        Optional<ClassesDTO> classesDTO = classesService.findOne(id);
        return ResponseEntity.ok().body(classesDTO .get());
    }
}
