import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Validation from '../utils/validation';
import { CustomValidators } from '../_helpers/custom-validators';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  roles: any[] = []; // Define your roles here
  errorMessage = '';
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router // Injectez le Router dans le constructeur
  ) { }

  ngOnInit(): void {
    // Initialize the form
    this.form = this.formBuilder.group({
    
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required] // 'role' field is required
    });

    // Define available roles
    this.roles = [
      { id: 1, name: 'candidat' },
      { id: 2, name: 'recruteur' },
      { id: 3, name: 'admin' },
     
    ];
  }

  // Submit the form
  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
console.log(this.form.value.role)

    this.authService.create( this.form.value.email,this.form.value.password, this.form.value.role).subscribe({
      next: (res) => {
        console.log(res);
        // Redirect to gestion-utilisateurs after successful submission
        this.router.navigateByUrl('/admin');
      },
      error: (e) => {
     
        alert(`Error: ${e.error}`); // Show an alert with error message
      }
    });
  }

  // Reset the form
  resetForm(): void {
    this.submitted = false;
    this.form.reset();
  }
}


