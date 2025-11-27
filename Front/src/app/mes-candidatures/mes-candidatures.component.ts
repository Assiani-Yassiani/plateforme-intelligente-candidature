import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CandidatureService } from '../_services/candidature.service';
import { TokenStorageService } from '../_services/token-storage.service';

import { CandidatureForCandidat } from '../model/candidature.candidat.response';

@Component({
  selector: 'app-mes-candidatures',
  templateUrl: './mes-candidatures.component.html',
  styleUrls: ['./mes-candidatures.component.css']
})
export class MesCandidaturesComponent implements OnInit {
  showModal = false;
  candidatureData: CandidatureForCandidat[] = [];
  error = '';
  status = '';
  message = '';
  id:any
  formattedDate:any;
  constructor(private candidautreService: CandidatureService, private tokenStorage: TokenStorageService) { }

  formatDate(date:Date) {
    let day = String(date.getDate()).padStart(2, '0');
    let month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    let year = date.getFullYear();
    return `${day}/${month}/${year}`;
}
  isNotExpired(expirationDate: Date): boolean {
     this.formattedDate = this.formatDate(new Date());

    return expirationDate > this.formattedDate;
  }
  
  getCondidature() {
    this.candidautreService.getAllCandidatureForCandidat(0, 10, undefined, undefined, this.tokenStorage.getUser().id).subscribe({
      next: data => {


        this.candidatureData = data.content;
        console.log(this.candidatureData)
      },
      error: err => {
        console.log('Failed to get candidature:' + err);
        this.message = err.error.message;
        this.error = err.error.error;
        this.status = err.error.status;
      }
    });
  }

  ngOnInit(): void {
    this.getCondidature()

  }



  toggleModal(id: number) {
    this.id=id
   
    this.showModal = true;
    
  }

  closeModal() {
    this.showModal = false;
  }

  delete(){
    console.log(this.id)
    this.candidautreService.deleteCandidature(this.id).subscribe(
      data=>{


        console.log(data)
        this.getCondidature()
        this. closeModal()


      }

    )

    
}
onClick(status: string): void {
  this.candidautreService.getAllCandidatureForCandidat(0, 10, undefined, undefined, this.tokenStorage.getUser().id).subscribe({
    next: data => {
      if (status === '') {
        // If status is empty, show all data
        this.getCondidature()
      } else {
        // Filter the data by the provided status
        this.candidatureData = data.content.filter((item: any) => item.status === status);
      }


     
    },
    error: err => {
      console.log('Failed to get candidature:' + err);
      this.message = err.error.message;
      this.error = err.error.error;
      this.status = err.error.status;
    }
  });
 
    
  
}
}

