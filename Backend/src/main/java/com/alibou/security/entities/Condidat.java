package com.alibou.security.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Condidat")
public class Condidat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private  Integer idc;
    private String nom;
    private String prenom;
    private String  region;
    private String tel;
    private String civilite;

    private String diplomes;
    private String competences;
    private  String  domaine;
    private  String   experienceProf;
    @Lob
    private byte[] cv;

}
