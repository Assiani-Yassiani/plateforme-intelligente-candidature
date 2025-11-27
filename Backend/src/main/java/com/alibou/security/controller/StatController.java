package com.alibou.security.controller;

import com.alibou.security.service.StatService;
import com.alibou.security.respense.StatistiqueRespense;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class StatController {

    @Autowired
    private StatService statistiqueService;

    @GetMapping("/stat")
    public ResponseEntity<StatistiqueRespense> getStatistics() {
        StatistiqueRespense stats = statistiqueService.getStatistics();
        if (stats != null) {
            return ResponseEntity.ok(stats);
        } else {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        }
    }
}