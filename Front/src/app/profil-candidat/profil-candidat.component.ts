import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';


import { Router } from '@angular/router';
import { ProfileService } from '../_services/candidat.service';
import { CandidatureService } from '../_services/candidature.service';
@Component({
  selector: 'app-profil-candidat',
  templateUrl: './profil-candidat.component.html',
  styleUrls: ['./profil-candidat.component.css']
})
export class ProfilCandidatComponent implements OnInit {


  showModal = false;

  message = '';
  error = '';
  status = '';
  condidat: any
  entretiens: any


  constructor(private entretienService: CandidatureService, private candidateService: ProfileService, private tokenStorage: TokenStorageService, private router: Router) { 
    this.getCandidat()
  }

  ngOnInit(): void {

    this.tokenStorage.saveidconduiat(-1)

   this.getCandidat()

    this.entretienService.getAllCandidatureForCandidat(0, 10, undefined, undefined, this.tokenStorage.getUser().id).subscribe(data => {

      this.entretiens = data.content
      console.log(data)


    })
  }

  getCandidat(){
    this.candidateService.getProfileDataByCandidatId(this.tokenStorage.getUser().id).subscribe({
      next: data => {
        this.condidat = data;


        this.tokenStorage.saveidconduiat(data.id)

        console.log(this.tokenStorage.getidconduiat())

      },
      error: err => {

        this.message = err.error.message;
        this.error = err.error.error;
        this.status = err.error.status;
      }
    });
  }
  toggleModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
  
}
