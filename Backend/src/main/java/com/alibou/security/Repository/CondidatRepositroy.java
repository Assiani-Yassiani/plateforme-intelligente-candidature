package com.alibou.security.Repository;


import com.alibou.security.entities.Condidat;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;

@Repository

public interface CondidatRepositroy extends JpaRepository<Condidat, Integer>,JpaSpecificationExecutor<Condidat> {
    Optional<Condidat> findByIdc(Integer idc);
}
