package com.huyduc.manage.repository;

import com.huyduc.manage.bean.District;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data JPA repository for the District entity.
 */
@Repository
public interface DistrictRepository extends JpaRepository<District, String> {
    List<District> getAllByProvinceIdOrderByNameAsc(String id);
}
