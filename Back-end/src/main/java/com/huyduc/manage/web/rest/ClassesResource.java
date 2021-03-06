package com.huyduc.manage.web.rest;

import com.huyduc.manage.security.AuthoritiesConstants;
import com.huyduc.manage.service.ClassesService;
import com.huyduc.manage.service.dto.ClassesDTO;
import com.huyduc.manage.web.rest.util.HeaderUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import com.huyduc.manage.web.rest.errors.ClassesAlreadyExistException;

import java.net.URISyntaxException;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicInteger;

import static org.hibernate.id.IdentifierGenerator.ENTITY_NAME;

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
     * GET /class?course=:id : get the "id" course
     *
     * @return the ResponseEntity with status 200 (OK) and with body all classes by year id
     */
    @GetMapping("/class")
    @PreAuthorize("hasRole(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity<List<ClassesDTO>> getAllClassesByCourseId(@RequestParam(name = "course", required = true, defaultValue = "0") Long id) {
        final List<ClassesDTO> list = classesService.findAllClassesByCourseId(id);
        return new ResponseEntity<>(list, HttpStatus.OK);
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
        return ResponseEntity.ok().body(classesDTO.get());
    }

    /**
     * POST  /class: Create a new years.
     *
     * @param classesDTO the classesDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new classesDTO, or with status 400 (Bad Request) if the class has already or not created.
     * @throws URISyntaxException           if the Location URI syntax is incorrect
     * @throws ClassesAlreadyExistException 400 (Bad Request) if the class is already in exists
     */
    @PostMapping("/class")
    @PreAuthorize("hasRole(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity<ClassesDTO> createClass(@RequestBody ClassesDTO classesDTO) throws URISyntaxException {
        try {
            ClassesDTO result = classesService.save(classesDTO);
            return new ResponseEntity(result, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity(Collections.singletonMap("createClassFailed",
                    e.getLocalizedMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * PUT  /class : Updates an existing class.
     *
     * @param classesDTO the classesDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated classesDTO,
     * or with status 400 (Bad Request) if the classesDTO is not valid and not update,
     * @throws URISyntaxException if the Location URI syntax is incorrect
     * @throws ClassesAlreadyExistException 400 (Bad Request) if the class is already in exists
     */
    @PutMapping("/class")
    @PreAuthorize("hasRole(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity<ClassesDTO> updateClass(@RequestBody ClassesDTO classesDTO) throws URISyntaxException {
        try {
            if (classesDTO.getId() <= 0) {
                return new ResponseEntity(Collections.singletonMap("updateClassFailed", "Lớp học không tồn tại!"), HttpStatus.BAD_REQUEST);
            }
            Optional<ClassesDTO> result = classesService.updateClass(classesDTO);
            return ResponseEntity.ok()
                    .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, classesDTO.getId()+""))
                    .body(result.get());
        } catch (Exception e) {
            return new ResponseEntity(Collections.singletonMap("updateClassFailed",
                    e.getLocalizedMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * DELETE /class: delete the class by id
     *
     * @param ids the list id of the class to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/class")
    @PreAuthorize("hasRole(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity<AtomicInteger> deleteYears(@RequestBody List<Long> ids) {
        AtomicInteger count = classesService.delete(ids);
        if (count.get() <= 0)
            return ResponseEntity.badRequest().body(count);
        return ResponseEntity.ok().body(count);
    }
}
