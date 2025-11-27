package com.alibou.security.controller;

import com.alibou.security.Repository.CondidatRepositroy;
import com.alibou.security.Repository.CondidatureCondidatRepository;
import com.alibou.security.Repository.JobsRepository;
import com.alibou.security.Repository.PostulationRepository;
import com.alibou.security.entities.CondidatureCondidat;
import com.alibou.security.entities.Postulation;
import com.alibou.security.service.CondidatureService;
import com.alibou.security.respense.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class CondidatureController {
    private final com.alibou.security.Repository.CondidatureCondidatRepository CondidatureCondidatRepository;
    private final PostulationRepository postulationRepository;
    private final CondidatRepositroy condidatRepositroy;
    private final JobsRepository jobsRepository;
    private final CondidatureCondidatRepository condidatureCondidatRepository;

    @Autowired
    private CondidatureService condidatureService;

    @PostMapping("/candidatures/postulation")
    public ResponseEntity<Postulation> handleFile(@RequestParam("idj") Integer idj, @RequestParam("idc") Integer idc) throws IOException {
        try {
            Postulation postulation = condidatureService.handleFileUpload(idj, idc);
            return ResponseEntity.status(HttpStatus.CREATED).body(postulation);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/candidatures/condidat/all")
    public ResponseEntity<Page<CondidatureCondidat>> getCondudatureForcondidat(
            @RequestParam(value = "pageNo", defaultValue = "0") int page,
            @RequestParam(value = "pageSize", defaultValue = "10") int size,
            @RequestParam(value = "sortBy", defaultValue = "id") String sortBy,
            @RequestParam(value = "sortDir", defaultValue = "desc") String sortDir,
            @RequestParam(value = "CondidatId", defaultValue = "0") int CondidatId) {

        Sort.Direction direction = sortDir.equalsIgnoreCase("desc") ? Sort.Direction.DESC : Sort.Direction.ASC;
        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortBy));
        Page<CondidatureCondidat> pageResult = CondidatureCondidatRepository.findByIdc(CondidatId, pageable);

        return ResponseEntity.ok(pageResult);
    }

    @GetMapping("/candidatures/recruteur/all")
    public ResponseEntity<Page<Postulation>> getCondudatureForrecruter(
            @RequestParam(value = "pageNo", defaultValue = "0") int page,
            @RequestParam(value = "pageSize", defaultValue = "10") int size,
            @RequestParam(value = "sortBy", defaultValue = "id") String sortBy,
            @RequestParam(value = "sortDir", defaultValue = "desc") String sortDir,
            @RequestParam(value = "offreId", defaultValue = "0") int offreId) {

        Sort.Direction direction = sortDir.equalsIgnoreCase("desc") ? Sort.Direction.DESC : Sort.Direction.ASC;
        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortBy));
        Page<Postulation> pageResult = postulationRepository.findByIdj(offreId, pageable);

        return ResponseEntity.ok(pageResult);
    }

    @Transactional
    @DeleteMapping("/candidatures/{id}")
    public ResponseEntity<String> delete(@PathVariable Integer id) {
        try {
            CondidatureCondidatRepository.deleteById(id);
            postulationRepository.deleteByIdcondidature(id);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Candidature deleted successfully.");
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Candidature not found: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete candidature: " + e.getMessage());
        }
    }

    @PutMapping("/candidatures/status")
    public ResponseEntity<String> updateStatusCondidature(@RequestBody StatusRespense status) {
        return condidatureService.updateStatusCandidature(status);
    }
}
