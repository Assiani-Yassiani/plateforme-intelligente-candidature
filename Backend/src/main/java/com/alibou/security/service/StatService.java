package com.alibou.security.service;

import com.alibou.security.Repository.PostulationRepository;
import com.alibou.security.Repository.JobsRepository;
import com.alibou.security.respense.StatistiqueRespense;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
@Service
public class StatService {

    @Autowired
    private JobsRepository jobsRepository;

    @Autowired
    private PostulationRepository postulationRepository;

    public StatistiqueRespense getStatistics() {
        StatistiqueRespense statistique = new StatistiqueRespense();
        LocalDate currentDate = LocalDate.now();

        long expiredJobs = jobsRepository.countExpiredJobs(currentDate);
        long openJobs = jobsRepository.countOpenJobs(currentDate);
        long refusedPostulations = postulationRepository.countRefusedPostulations();
        long acceptedPostulations = postulationRepository.countAcceptedPostulations();
        long nonViewedPostulations = postulationRepository.countNonViewedPostulations();
        long scheduledInterviews = postulationRepository.countScheduledInterviews(currentDate);
        long completedInterviews = postulationRepository.countCompletedInterviews(currentDate);

        statistique.setExpires(String.valueOf(expiredJobs));
        statistique.setOuverts(String.valueOf(openJobs));
        statistique.setRefusees(String.valueOf(refusedPostulations));
        statistique.setAccpetees(String.valueOf(acceptedPostulations));
        statistique.setNonvues(String.valueOf(nonViewedPostulations));
        statistique.setProgrammes(String.valueOf(scheduledInterviews));
        statistique.setFaits(String.valueOf(completedInterviews));

        return statistique;
    }
}
