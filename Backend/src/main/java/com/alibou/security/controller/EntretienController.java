package com.alibou.security.controller;

import com.alibou.security.entities.Postulation;
import com.alibou.security.Repository.PostulationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class EntretienController {
    private final PostulationRepository postulationRepository;

    @GetMapping("/entretien/date/{id}")
    public ResponseEntity<Postulation> entretien_date(@PathVariable Integer id) {
        Optional<Postulation> postulation = postulationRepository.findById(id);
        if (postulation.isPresent()) {
            return ResponseEntity.ok(postulation.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @GetMapping("/entretien/{id}")
    public ResponseEntity<List<Postulation>> getentretiens(@PathVariable Integer id) {
        List<Postulation> entretiens = postulationRepository.findByIdj(id);
        if (entretiens.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(entretiens);
        } else {
            return ResponseEntity.ok(entretiens);
        }
    }
}
