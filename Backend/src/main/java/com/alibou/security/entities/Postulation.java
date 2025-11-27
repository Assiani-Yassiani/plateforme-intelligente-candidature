package com.alibou.security.entities;

import jakarta.persistence.*;
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
@Table(name = "Postulation")
public class Postulation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private  Integer idj;
    private String nom;
    private Integer idc;
    private  Integer idcondidature;
    private String prenom;
    private String  region;
    private String tel;
    private String civilite;

    private String diplomes;
    private String competences;
    private  String  domaine;
    private  String   experienceProf;
    private  String Status;
    private  Integer score;
    private String date;
    private String Horaire;
    private String meet;
    private LocalDate dateExpiration;
    private LocalDate datePublication;


    @Lob
    private byte[] cv;

}
