package com.huyduc.manage.repository;

import com.huyduc.manage.bean.Course;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Course entity.
 */
@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
    Page<Course> findAllByYearId(Pageable pageable, Long id);
}
