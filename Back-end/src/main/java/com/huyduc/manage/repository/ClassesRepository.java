package com.huyduc.manage.repository;

import com.huyduc.manage.bean.Classes;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Spring Data JPA repository for the Classes entity.
 */
public interface ClassesRepository extends JpaRepository<Classes, String> {
}
