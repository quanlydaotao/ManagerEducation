package com.huyduc.manage.repository;

import com.huyduc.manage.bean.Classes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data JPA repository for the Classes entity.
 */
@Repository
public interface ClassesRepository extends JpaRepository<Classes, Long> {
    List<Classes> findAllByCourseIdOrderByIdDesc(Long id);
    Integer countByCourseId(Long id);
    Optional<Classes> findByName(String name);
}
