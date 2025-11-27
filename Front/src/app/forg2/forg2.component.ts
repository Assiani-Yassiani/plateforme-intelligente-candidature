import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forg2',
  templateUrl: './forg2.component.html',
  styleUrls: ['./forg2.component.css']
})
export class Forg2Component implements OnInit, OnDestroy {
 
  parametre: any;
  id: any;
  form: FormGroup;
  submitted = false;
  message: string = '';
  isLoginFailed = false; // Ajout de cette propriété
  status = ''; // Ajout de cette propriété
  error = ''; // Ajout de cette propriété

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.form = this.formBuilder.group({
      code: ['', [Validators.required, Validators.pattern('^[0-9]+$')]] // Code must be an integer and required
    });
  }

  ngOnInit(): void { }

  get f() { return this.form.controls; }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    this.authService.get_code(localStorage.getItem("email")).subscribe({
      next: data => {
        this.id = data.id;
        console.log('Entered Code:', this.form.value.code);
        console.log('Retrieved Code:', data.code);

        if (this.form.value.code == data.code) {
          this.authService.delete_code(this.id).subscribe(data => {
            console.log('Code deleted:', data);
          });

          this.router.navigate(['/forg3']);
        } else {
          this.parametre = 1;
          this.error = 'Le code entré est incorrect.';
          this.status = 'Erreur';
          this.isLoginFailed = true;
        }
      },
      error: err => {
        this.error = err.error.error;
        this.status = err.error.status;
        this.isLoginFailed = true;
      }
    });
  }

  ngOnDestroy() {
    if (this.id) {
      this.authService.delete_code(this.id).subscribe(data => {
        console.log('Code deleted on destroy:', data);
      });
    }
  }

  closeModal() {
    this.isLoginFailed = false;
  }
}
