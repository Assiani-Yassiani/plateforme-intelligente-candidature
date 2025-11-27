package com.alibou.security.service;

import com.alibou.security.Repository.*;
import com.alibou.security.EmailSender.EmailSender;
import com.alibou.security.entities.*;
import com.alibou.security.respense.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDate;
import java.util.Map;
import java.util.Optional;

@Service
public class CondidatureService {
    @Autowired
    private JobsRepository jobsRepository;

    @Autowired
    private CondidatRepositroy condidatRepository;
    @Autowired
    private PostulationRepository postulationRepository;

    @Autowired
    private CondidatureCondidatRepository condidatureCondidatRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailSender emailSender;

    @Autowired
    private AuthenticationService authenticationService;
    public Postulation handleFileUpload(Integer idj, Integer idc) throws IOException {
        Postulation pdfDocument = new Postulation();

        Map<String, Integer> diplomaScores = Map.of(
                "Ingénierie", 10,
                "Master", 6,
                "Licence", 3
        );

        Map<String, Integer> experienceScores = Map.of(
                "Débutant", 1,
                "1 à 2 ans", 5,
                "3 à 5 ans", 7,
                "6 à 9 ans", 10,
                "10 ans ou plus", 15
        );

        Optional<Condidat> condidatOptional = condidatRepository.findByIdc(idc);
        if (condidatOptional.isPresent()) {
            Condidat condidat = condidatOptional.get();

            Integer diplomaScore = calculateDiplomaScore(condidat.getDiplomes(), diplomaScores);
            Integer experienceScore = experienceScores.getOrDefault(condidat.getExperienceProf(), 0);

            Optional<Jobs> jobOptional = jobsRepository.findById(idj);
            if (jobOptional.isPresent()) {
                Jobs job = jobOptional.get();
                LocalDate date = LocalDate.now();
                CondidatureCondidat condidatureCondidat = new CondidatureCondidat();
                condidatureCondidat.setIdc(idc);
                condidatureCondidat.setStatus("en cours");
                condidatureCondidat.setDatePublication(job.getDatePublication());
                condidatureCondidat.setDateExpiration(job.getDateExpiration());
                condidatureCondidat.setTypeContrat(job.getTypeContrat());
                condidatureCondidat.setPostesVacants(job.getPostesVacants());
                condidatureCondidat.setCompetences(job.getCompetences());
                condidatureCondidat.setDiplome(job.getDiplome());
                condidatureCondidat.setDomaine(job.getDomaine());
                condidatureCondidat.setDateSoumission(date);
                condidatureCondidat.setExperienceProf(job.getExperienceProf());
                CondidatureCondidat condidatureCondidatSaved = condidatureCondidatRepository.save(condidatureCondidat);

                pdfDocument.setNom(condidat.getNom());
                pdfDocument.setPrenom(condidat.getPrenom());
                pdfDocument.setRegion(condidat.getRegion());
                pdfDocument.setIdj(idj);
                pdfDocument.setIdc(idc);
                pdfDocument.setTel(condidat.getTel());
                pdfDocument.setCivilite(condidat.getCivilite());
                pdfDocument.setCv(condidat.getCv());
                pdfDocument.setDiplomes(condidat.getDiplomes());
                pdfDocument.setIdcondidature(condidatureCondidatSaved.getId());
                pdfDocument.setDatePublication(job.getDatePublication());
                pdfDocument.setDomaine(condidat.getDiplomes());
                pdfDocument.setExperienceProf(condidat.getExperienceProf());
                pdfDocument.setCompetences(condidat.getCompetences());
                pdfDocument.setScore(diplomaScore + experienceScore);
                pdfDocument.setStatus("en cours");

                return postulationRepository.save(pdfDocument);
            }
        }

        return null;
    }

    private Integer calculateDiplomaScore(String diplomes, Map<String, Integer> diplomaScores) {
        return diplomaScores.getOrDefault(diplomes, 0);
    }

    public ResponseEntity<String> updateStatusCandidature(StatusRespense status) {
        Optional<Postulation> postulation = postulationRepository.findById(status.getId());
        Optional<CondidatureCondidat> condidature = condidatureCondidatRepository.findById(status.getIdcondidature());

        if (condidature.isPresent()) {
            CondidatureCondidat condidature2 = condidature.get();
            if (postulation.isPresent()) {
                Postulation postulationEntity = postulation.get();
                User user = userRepository.findById(condidature2.getIdc()).orElse(null);

                if (user == null) {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
                }

                if (status.getStatus() != null) {
                    postulationEntity.setStatus(status.getStatus());
                    condidature2.setStatus(status.getStatus());
                }

                if (status.getHoraire() != null && status.getDate() != null && status.getMeet() != null) {
                    postulationEntity.setHoraire(status.getHoraire());
                    postulationEntity.setDate(status.getDate());
                    postulationEntity.setMeet(status.getMeet());
                    condidature2.setDate(status.getDate());
                    condidature2.setMeet(status.getMeet());
                    condidature2.setHoraire(status.getHoraire());

                    emailSender.send(
                            user.getEmail(),
                            authenticationService.status(postulationEntity.getNom(), status.getMeet(), postulationEntity.getDomaine(), status.getDate(), status.getHoraire()),
                            "Entretien RH"
                    );
                }

                postulationRepository.save(postulationEntity);
                return ResponseEntity.ok("StatusRespense updated successfully");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Postulation not found");
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Candidature not found");
        }
    }

}
