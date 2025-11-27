import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forg3',
  templateUrl: './forg3.component.html',
  styleUrls: ['./forg3.component.css']
})
export class Forg3Component implements OnInit {

  form: FormGroup;
  submitted = false;
  message: string = '';
  passwordMismatch: boolean = false;
  isLoginFailed = false; // Ajout de cette propriété
  status = ''; // Ajout de cette propriété
  error = ''; // Ajout de cette propriété

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.form = this.formBuilder.group({
      password: ['', [Validators.required]], // Password is required
      retypePassword: ['', [Validators.required]] // Retype password is required
    });
  }

  ngOnInit(): void { }

  get f() { return this.form.controls; }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.value.password !== this.form.value.retypePassword) {
      this.passwordMismatch = true;
      return;
    } else {
      this.authService.rest_password(localStorage.getItem('email'), this.form.value.password).subscribe({
        next: data => {
          this.router.navigate(['/login']);
        },
        error: err => {
          this.error = err.error.error;
          this.status = err.error.status;
          this.isLoginFailed = true;
        }
      });
    }
  }

  closeModal() {
    this.isLoginFailed = false;
  }
}
