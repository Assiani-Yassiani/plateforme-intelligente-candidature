import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { OffreService } from '../_services/offre.service';
import { EntretienService } from '../_services/entretien.service';
import { OffreResponse } from '../model/offre.response';
import { CandidatureService } from '../_services/candidature.service';
import { EntretienDto } from '../model/entretien.dto';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-offre-emploi',
  templateUrl: './offre-emploi.component.html',
  styleUrls: ['./offre-emploi.component.css']
})
export class OffreEmploiComponent implements OnInit {
  showCandidatButton: boolean = false;
  showModal = false;
  showListEntretien = false;
  errorMessage = '';
  error = '';
  status = '';
  offreData: OffreResponse = {} as OffreResponse;
  entretienData: EntretienDto[] = [];
  role: string = this.tokenStorageService.getUser().role;
  isLoggedIn = !!this.tokenStorageService.getToken();;
  constructor(private route: ActivatedRoute, private tokenStorageService: TokenStorageService,
    private router: Router, private offreService: OffreService, private entretienService: EntretienService,
    private candidautreService: CandidatureService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.showCandidatButton = this.role !== 'recruteur';
    this.route.params.subscribe(params => {
      const offreId = params['id'];

      this.offreService.getOffre(offreId).subscribe({
        next: data => {

          this.offreData = data;
        },
        error: err => {
          this.errorMessage = err.error.message;
          this.error = err.error.error;
          this.status = err.error.status;
        }
      });
    });
  }
  redirect() {



  }


  closeModal() {
    this.error = '';
  }
  toggleListEntretien() {
    this.showListEntretien = true;
    this.route.params.subscribe(params => {
      const offreId = params['id'];
      console.log(offreId)

      this.entretienService.getEntretienByoffreId(offreId).subscribe({
        next: data => {

          this.entretienData = data;
        },
        error: err => {
          this.errorMessage = err.error.message;
          this.error = err.error.error;
          this.status = err.error.status;
        }
      });
    });



  }
  isOfferValid(x:any): boolean {
    return this.showCandidatButton && x> new Date();
  }
  
  closeListEntretien() {
    this.showListEntretien = false;
  }
  postuler(id: any) {
    this.candidautreService.createCandidature(id, this.tokenStorage.getUser().id).subscribe({
      next: data => {

        console.log(data)
        this.router.navigate(["/test-technique", id, data.id])
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.error = err.error.error;
        this.status = err.error.status;
      }
    });





  }
}

