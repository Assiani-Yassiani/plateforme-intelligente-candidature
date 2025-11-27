package com.alibou.security.service;

import com.alibou.security.entities.Condidat;
import com.alibou.security.Repository.CondidatRepositroy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class CondiadatService {
    private final CondidatRepositroy condidatRepository;

    @Autowired
    public  CondiadatService( CondidatRepositroy ccondidatRepository) {
        this.condidatRepository = ccondidatRepository;
    }


    public Condidat saveOrUpdateCondidat(
            String nom,
            String prenom,
            String region,
            Integer idc,
            String tel,
            String civilite,
            String diplomes,
            String domaine,
            String experienceProf,
            String competences,
            Long id,
            MultipartFile file) throws IOException {

        Condidat condidat;
System.out.println(id);
       ;
        if (id != -1 ) {
            long longValue = id;
            int intValue = (int) longValue;
            System.out.println(intValue);


            condidat = condidatRepository.findById(intValue).orElse(new Condidat());
            System.out.println(condidat.getId());
        } else {
            condidat = new Condidat();
        }

        if (nom != null ||!nom.isEmpty() ) {
            condidat.setNom(nom);
        }
        if (prenom != null  ||!prenom.isEmpty()) {
            condidat.setPrenom(prenom);
        }
        if (region != null  ||!region.isEmpty()) {
            condidat.setRegion(region);
        }
        if (idc != null  ) {
            condidat.setIdc(idc);
        }
        if (tel != null  ||!tel.isEmpty()) {
            condidat.setTel(tel);
        }
        if (civilite != null  ||!civilite.isEmpty()) {
            condidat.setCivilite(civilite);
        }
        if (file != null && !file.isEmpty()) {
            condidat.setCv(file.getBytes());
        }
        if (diplomes != null  ||!diplomes.isEmpty()) {
            condidat.setDiplomes(diplomes);
        }
        if (domaine != null  ||!domaine.isEmpty()) {
            condidat.setDomaine(domaine);
        }
        if (experienceProf != null  ||!experienceProf.isEmpty()) {
            condidat.setExperienceProf(experienceProf);
        }
        if (competences != null  ||!competences.isEmpty()) {
            condidat.setCompetences(competences);
        }

        return condidatRepository.save(condidat);
}}
