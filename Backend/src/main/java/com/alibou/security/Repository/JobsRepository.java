package com.alibou.security.Repository;

import com.alibou.security.entities.Jobs;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.time.LocalDate;
import java.util.List;



@Repository
public interface JobsRepository extends JpaRepository<Jobs, Integer>, JpaSpecificationExecutor<Jobs> {
    @Query("SELECT COUNT(j) FROM Jobs j WHERE j.dateExpiration < ?1")
    long countExpiredJobs(LocalDate currentDate);

    @Query("SELECT COUNT(j) FROM Jobs j WHERE j.dateExpiration >= ?1")
    long countOpenJobs(LocalDate currentDate);

    @Query("SELECT j FROM Jobs j WHERE  j.domaine = :domaine  AND " +
            "j.diplome =:diplome"
            )
    List<Jobs> findByCriteria(String domaine , String  diplome);






}
