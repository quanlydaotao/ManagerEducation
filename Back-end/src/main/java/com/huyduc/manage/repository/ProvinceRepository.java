package com.huyduc.manage.repository;

import com.huyduc.manage.bean.Province;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Province entity.
 */
@Repository
public interface ProvinceRepository extends JpaRepository<Province, String> {
}
