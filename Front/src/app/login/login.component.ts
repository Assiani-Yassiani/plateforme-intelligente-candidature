import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventDriverService } from '../_services/event.driver.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form!: FormGroup
  submitted = false;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  role: string = '';
  error = '';
  status = '';
  message: string = '';
  id: any;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router,
    private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, private eventDriverService: EventDriverService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]]

      }
    );
    /*if (this.tokenStorage.getToken()) {
      this.authService.setLoggedInStatus(true);
      this.isLoggedIn = true;
      this.role = this.tokenStorage.getUser().role;
      this.id = this.tokenStorage.getUser().id;
      console.log(this.id);
      console.log(this.tokenStorage.getUser());

    }*/
    this.activatedRoute.queryParams.subscribe(params => {
      this.message = params['message'];
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }


  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    this.authService.login(this.form.value.email, this.form.value.password).subscribe({
      next: data => {
        this.tokenStorage.saveToken(data.token);


        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.authService.setLoggedInStatus(true);
        this.role = this.tokenStorage.getUser().role;
        this.eventDriverService.publishEvent(data)
        

        console.log("id", this.tokenStorage.getUser().id);
        console.log("role", this.tokenStorage.getUser().role);
        if (this.role === 'candidat') {
          this.router.navigateByUrl('offresemploi');
        }
        else if (this.role === 'recruteur') { this.router.navigateByUrl('dashboard'); }
        else if  (this.role === 'admin')  {
          this.router.navigateByUrl('admin')

        }
        

      },
      error: err => {
        this.errorMessage = err.error.message;
        this.error = err.error.error;
        this.status = err.error.status;
        this.isLoginFailed = true;

      }
    });
  }
  closeModal() {

    this.isLoginFailed = false;
  }

}
