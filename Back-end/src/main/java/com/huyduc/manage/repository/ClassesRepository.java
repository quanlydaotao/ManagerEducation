package com.huyduc.manage.repository;

import com.huyduc.manage.bean.Classes;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Classes entity.
 */
@Repository
public interface ClassesRepository extends JpaRepository<Classes, Long> {
    Page<Classes> findAllByCourseId(Pageable pageable, Long id);
}
