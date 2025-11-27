package com.alibou.security.Repository;

import com.alibou.security.entities.Postulation;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface PostulationRepository extends JpaRepository<Postulation, Integer> {
  Page<Postulation> findByIdj(Integer idj, Pageable pageable);
  List<Postulation> findByIdj(Integer idj);

  @Query("SELECT COUNT(p) FROM Postulation p WHERE p.Status = 'refusée'")
  long countRefusedPostulations();

  @Query("SELECT COUNT(p) FROM Postulation p WHERE p.Status = 'acceptée'")
  long countAcceptedPostulations();

  @Query("SELECT COUNT(p) FROM Postulation p WHERE p.Status = 'en cours'")
  long countNonViewedPostulations();

  @Query("SELECT COUNT(p) FROM Postulation p WHERE DATE(p.date) > :currentDate")
  long countScheduledInterviews(@Param("currentDate") LocalDate currentDate);

  @Query("SELECT COUNT(p) FROM Postulation p WHERE DATE(p.date) <= :currentDate")
  long countCompletedInterviews(@Param("currentDate") LocalDate currentDate);
  void deleteByIdcondidature(Integer idcondidature);

}
