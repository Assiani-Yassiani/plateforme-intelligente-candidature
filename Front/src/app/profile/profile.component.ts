import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';

import { ProfileService } from '../_services/candidat.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  message = '';
  error = '';
  status = '';
  condidat: any
  test:any;
  constructor(private candidateService: ProfileService, private tokenStorage: TokenStorageService,) { }

  ngOnInit(): void {
    this.test=false;
    this.getCandidat()
  }

  getCandidat(){
    this.candidateService.getProfileDataByCandidatId(this.tokenStorage.getUser().id).subscribe({
      next: data => {
        this.test=true;

      },
      error: err => {

        this.message = err.error.message;
        this.error = err.error.error;
        this.status = err.error.status;
      }
    });
  }
}
