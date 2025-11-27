import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../_services/auth.service';

import { EventData } from '../_shared/event.class';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forg1',
  templateUrl: './forg1.component.html',
  styleUrls: ['./forg1.component.css']
})
export class Forg1Component implements OnInit {
  form: FormGroup;
  submitted = false;
  message: string = ''
  isLoginFailed = false; // Ajout de cette propriété
  status = ''; // Ajout de cette propriété
  error = ''; // Ajout de cette propriété

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router,) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.email]] // email is not required
    });
  }

  ngOnInit(): void { }

  get f() { return this.form.controls; }

  onSubmit(): void {
    localStorage.setItem("email", this.form.value.email)

    this.authService.forg(this.form.value.email).subscribe({
      next: data => {



        this.router.navigate(['forg2']);

      },
      error: err => {
        this.error = err.error.error;
        this.status = err.error.status;
        this.isLoginFailed = true;
      }
    })
  }

  closeModal() {
    this.submitted = false;
  }




}
