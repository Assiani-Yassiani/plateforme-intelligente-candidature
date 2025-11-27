package com.alibou.security.Repository;

import com.alibou.security.entities.CondidatureCondidat;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface CondidatureCondidatRepository extends JpaRepository <CondidatureCondidat, Integer> {
    Page<CondidatureCondidat> findByIdc(Integer idc, Pageable pageable);
}
