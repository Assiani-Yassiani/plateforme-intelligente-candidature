package com.alibou.security.service;

import com.alibou.security.Repository.JobsRepository;
import com.alibou.security.entities.Jobs;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service

@RequiredArgsConstructor

public class JobsService {
    private final JobsRepository Jobsepository;
    public void updateJobs(int  id, Jobs job) {
        Jobs existjob = Jobsepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Jobs not found"));


        if (job.getDatePublication() != null) {
            existjob.setDatePublication(job.getDatePublication());
        }
        if (job.getDateExpiration() != null) {

            existjob.setDateExpiration(job.getDateExpiration());
        }
        if (job.getTypeContrat() != null) {
            existjob.setTypeContrat(job.getTypeContrat());
        }

        if (job.getPostesVacants() != null) {
            existjob.setPostesVacants(job.getPostesVacants());
        }
        if (job.getDesc1() != null) {
            existjob.setDesc1(job.getDesc1());
        }
        if (job.getDesc2() != null) {
            existjob.setDesc2(job.getDesc2());
        }
        if (job.getDesc3() != null) {
            existjob.setDesc3(job.getDesc3());
        }

        if (job.getExperienceProf() != null) {
            existjob.setDesc3(job.getExperienceProf());

        }

        if (job.getDiplome() != null) {
            existjob.setDiplome(job.getDiplome());
        }

        if (job.getDomaine() != null) {
            existjob.setDomaine(job.getDomaine());
        }



        if (job.getCompetences() != null) {

            existjob.setCompetences(job.getCompetences());
        }

        Jobsepository.save(existjob);

    }

}
