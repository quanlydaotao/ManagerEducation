package com.huyduc.manage.repository;

import com.huyduc.manage.bean.Years;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data JPA repository for the Years entity.
 */
@Repository
public interface YearsRepository extends JpaRepository<Years, Long> {
    Optional<Years> findOneByStartYears(String years);

    List<Years> findAllByStatusIsTrueOrderByStartYearsDesc();
}
