package com.huyduc.manage.repository;

import com.huyduc.manage.bean.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data JPA repository for the Course entity.
 */
@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
    List<Course> findAllByYearIdOrderByIdDesc(Long id);
}
