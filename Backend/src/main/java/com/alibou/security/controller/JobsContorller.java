package com.alibou.security.controller;

import com.alibou.security.entities.Jobs;
import com.alibou.security.service.JobsService;
import com.alibou.security.Repository.JobsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class JobsContorller {
    private final JobsRepository jobsRepository;
    private final JobsService JobsService;

    @PostMapping("/offre/create")
    public ResponseEntity<Jobs> save_jobs(@RequestBody Jobs request) {
        Jobs savedJob = jobsRepository.save(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedJob);
    }

    @GetMapping("/offre/{id}")
    public ResponseEntity<Optional<Jobs>> get_job(@PathVariable int id) {
        Optional<Jobs> job = jobsRepository.findById(id);
        if (job.isPresent()) {
            return ResponseEntity.ok(job);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(job);
        }
    }

    @PutMapping("/offre/{id}")
    public ResponseEntity<String> put_job(@PathVariable int id, @RequestBody Jobs job) {
        try {
            JobsService.updateJobs(id, job); // Appeler la méthode de mise à jour du service
            return ResponseEntity.status(HttpStatus.OK).body("Offre updated successfully.");
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Offre not found: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update offre: " + e.getMessage());
        }
    }

    @DeleteMapping("/offre/{id}")
    public ResponseEntity<String> delete_job(@PathVariable int id) {
        try {
            jobsRepository.deleteById(id);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Offre deleted successfully.");
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Failed to delete offre: " + e.getMessage());
        }
    }

    @GetMapping("/offre/search")
    public ResponseEntity<List<Jobs>> searchJobs(
            @RequestParam(required = false) String domaine,
            @RequestParam(required = false) String diplome,
            @RequestParam(required = false) String typeContrat,
            @RequestParam(required = false) String experienceProf) {
        List<Jobs> jobs = jobsRepository.findByCriteria(domaine, diplome);
        return ResponseEntity.ok(jobs);
    }

    @GetMapping("/offre/all")
    public ResponseEntity<Page<Jobs>> getAllOffre(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir) {

        Sort.Direction direction = sortDir.equalsIgnoreCase("desc") ? Sort.Direction.DESC : Sort.Direction.ASC;
        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortBy));
        Page<Jobs> jobsPage = jobsRepository.findAll(pageable);
        return ResponseEntity.ok(jobsPage);
    }
}
