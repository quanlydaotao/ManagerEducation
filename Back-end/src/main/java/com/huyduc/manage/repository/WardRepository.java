package com.huyduc.manage.repository;

import com.huyduc.manage.bean.Ward;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data JPA repository for the Ward entity.
 */
@Repository
public interface WardRepository extends JpaRepository<Ward, String> {
    List<Ward> getAllByDistrictIdOrderByNameAsc(String id);
}
