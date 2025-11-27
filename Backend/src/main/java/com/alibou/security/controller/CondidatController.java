package com.alibou.security.controller;

import com.alibou.security.service.CondiadatService;
import com.alibou.security.entities.Condidat;
import com.alibou.security.Repository.CondidatRepositroy;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class CondidatController {

    private final CondidatRepositroy condidatRepository;
    private final CondiadatService condidatService;

    @GetMapping("/profile/{id}")
    public ResponseEntity<Condidat> profile(@PathVariable Integer id) {
        Optional<Condidat> condidatOpt = condidatRepository.findByIdc(id);

        if (condidatOpt.isPresent()) {
            return ResponseEntity.ok(condidatOpt.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PostMapping("/condidat/create")
    public ResponseEntity<Condidat> condidat(
            @RequestParam("nom") String nom,
            @RequestParam("prenom") String prenom,
            @RequestParam("region") String region,
            @RequestParam("idc") Integer idc,
            @RequestParam("tel") String tel,
            @RequestParam("civilite") String civilite,
            @RequestParam("diplomes") String diplomes,
            @RequestParam("domaine") String domaine,
            @RequestParam("experienceProf") String experienceProf,
            @RequestParam("competences") String competences,
            @RequestParam(value = "id", required = false, defaultValue = "-1") Long id,
            @RequestBody MultipartFile file) throws IOException {

        Condidat savedCondidat = condidatService.saveOrUpdateCondidat(
                nom, prenom, region, idc, tel, civilite, diplomes, domaine, experienceProf, competences, id, file);

        return ResponseEntity.status(HttpStatus.CREATED).body(savedCondidat);
    }

    @GetMapping("/condidat")
    public ResponseEntity<List<Condidat>> get_condidat() {
        List<Condidat> condidats = condidatRepository.findAll();
        return ResponseEntity.ok(condidats);
    }
}