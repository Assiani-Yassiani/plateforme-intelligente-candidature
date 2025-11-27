package com.alibou.security.controller;

import com.alibou.security.Repository.PostulationRepository;
import com.alibou.security.Repository.TestRepository;
import com.alibou.security.entities.Postulation;
import com.alibou.security.entities.Test;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class TestController {
    private final TestRepository testRepository;
    private final PostulationRepository postulationRepository;

    @PutMapping("/test/{id}/{scors}")
    public ResponseEntity<Void> updateScore(@PathVariable Integer id, @PathVariable Integer scors) {
        if (scors < 0) {
            throw new IllegalArgumentException("Score must be a positive integer");
        }

        Postulation postulation = postulationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Postulation not found with id " + id));
        postulation.setScore(postulation.getScore() + scors);
        postulationRepository.save(postulation);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @GetMapping("/test/{id}")
    public ResponseEntity<Test> get_test(@PathVariable int id) {
        Optional<Test> test = testRepository.findById(id);
        if (test.isPresent()) {
            return ResponseEntity.ok(test.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PostMapping("/test")
    public ResponseEntity<String> create_test(@RequestBody Test test) {
        try {
            testRepository.save(test);
            return ResponseEntity.status(HttpStatus.CREATED).body("Test saved successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to save test");
        }
    }

    @ResponseStatus(HttpStatus.NOT_FOUND)
    class ResourceNotFoundException extends RuntimeException {
        public ResourceNotFoundException(String message) {
            super(message);
        }
    }
}
