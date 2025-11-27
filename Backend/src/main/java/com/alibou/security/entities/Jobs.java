package com.alibou.security.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Jobs")
public class Jobs {
    @Id
    @GeneratedValue
    private Integer id;

    private String  diplome;
    private String domaine;
    private String  competences;
    private String typeContrat;
    private String postesVacants;
    private String desc1;
    private String desc2;
    private String desc3;
    private String experienceProf;

    private LocalDate  dateExpiration;
    private LocalDate datePublication;



}
