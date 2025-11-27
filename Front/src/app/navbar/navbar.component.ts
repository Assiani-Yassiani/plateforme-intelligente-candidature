import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';
import { EventDriverService } from '../_services/event.driver.service';
import { ProfileService } from '../_services/candidat.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn = false;
  showRecruteurNavbar = false;
  showCandidatNavbar = false;
  showAdminNavbar = false;
  role!: String
  message = '';
  error = '';
  status = '';
  condidat: any
  constructor(private tokenStorageService: TokenStorageService, private router: Router, private eventDriverService: EventDriverService, private candidateService: ProfileService) {



  }

  ngOnInit(): void {
    //this.getData();
    /*this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Code to retrieve data from local storage after navigation
        this.tokenStorageService.getRolesAsObservable().subscribe({
          next:(data)=> this.role=data
        })

      }
    });*/

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.tokenStorageService.getUsersAsObservable().subscribe((user: any) => {
          this.role = user!.role
          console.log('isAuth ' + this.role)
          console.log("yassine" + this.role === 'recruteur')
          this.tokenStorageService.isAuth().subscribe(res => {
            this.isLoggedIn = res
            console.log("is", this.isLoggedIn)
          })
          this.showRecruteurNavbar = this.role === 'recruteur';
          this.showCandidatNavbar = this.role === 'candidat';
          this.showAdminNavbar = this.role === 'admin';

        })
      }
    });

  }






  getData() {
    this.tokenStorageService.getUsersAsObservable().subscribe((user: any) => {
      this.role = user?.role
      console.log('isAuth ' + this.role)
      this.tokenStorageService.isAuth().subscribe(res => {
        this.isLoggedIn = res
        console.log(this.isLoggedIn)
      })
      this.showRecruteurNavbar = this.role === 'recruteur';
      this.showCandidatNavbar = this.role === 'candidat';
      this.showAdminNavbar = this.role === 'admin';

    })
    /*this.eventDriverService.sourceEventSubjectObservable.subscribe((user:any)=>{
      this.role=user.role
            console.log('isAuth '+this.role)
            this.tokenStorageService.isAuth().subscribe(res=>{
              this.isLoggedIn=res
              console.log(this.isLoggedIn)
            })
            this.showRecruteurNavbar= this.role==='ROLE_RECRUTEUR';
            this.showCandidatNavbar= this.role==='ROLE_CANDIDAT';
    })*/

  }

  onLogout(): void {
    this.tokenStorageService.signOut();
    this.router.navigateByUrl('/login');

  }

}
