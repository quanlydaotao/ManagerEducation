package com.huyduc.manage.repository;

import com.huyduc.manage.bean.Years;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Spring Data JPA repository for the Years entity.
 */
public interface YearsRepository extends JpaRepository<Years, String> {
}
