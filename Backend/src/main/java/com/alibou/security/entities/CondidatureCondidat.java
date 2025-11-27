package com.alibou.security.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "CondidatureCondida")
public class CondidatureCondidat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private  Integer idc;
    private String status;

   
    private LocalDate  datePublication;

    private  LocalDate dateExpiration;
    
    private String typeContrat;
    private String postesVacants;
    private String competences;
    private String diplome;
    private String domaine;
    private  String  experienceProf;
    private  LocalDate  dateSoumission;
    private  String date;
    private  String meet;
    private String Horaire;



    
}
