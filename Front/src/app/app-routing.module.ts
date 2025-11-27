import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ErrorComponent } from './error/error.component';
import { OffreEmploiComponent } from './offre-emploi/offre-emploi.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { OffresEmploiComponent } from './offres-emploi/offres-emploi.component';
import { OffreFormComponent } from './offre-form/offre-form.component';
import { CandidatFormComponent } from './candidat-form/candidat-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MesCandidaturesComponent } from './mes-candidatures/mes-candidatures.component';
import { CandidaturesComponent } from './candidatures/candidatures.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { ProfilCandidatComponent } from './profil-candidat/profil-candidat.component';
import { EditProfilCandidatComponent } from './edit-profil-candidat/edit-profil-candidat.component';
import { LoadingComponent } from './loading/loading.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './_helpers/auth.guard';
import { Forg1Component } from './forg1/forg1.component';
import { Forg3Component } from './forg3/forg3.component';
import { Forg2Component } from './forg2/forg2.component';
import { AdminComponent } from './admin/admin.component';
import { CreateTestTechniqueComponent } from './create-test-technique/create-test-technique.component';
import { TestComponent } from './test/test.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminGuard } from './_guards/admin.guard';
import { RecruiterGuard } from './_guards/recruiter.guard';
import { CandidateGuard } from './_guards/candidate.guard';

const routes: Routes = [
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'home', component: HomeComponent },
  { path: 'create-test-technique/:id', component: CreateTestTechniqueComponent, canActivate: [AuthGuard, RecruiterGuard] },
  { path: 'forg1', component: Forg1Component },
  { path: 'forg2', component: Forg2Component },
  { path: 'forg3', component: Forg3Component },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'error', component: ErrorComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard, CandidateGuard] },
  { path: 'offresemploi/:id', component: OffreEmploiComponent },
  { path: 'new-profile', component: FileUploadComponent, canActivate: [AuthGuard, CandidateGuard] },
  { path: 'test-technique/:id/:idp', component: TestComponent, canActivate: [AuthGuard,  CandidateGuard] },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'new-password', component: NewPasswordComponent },
  { path: 'add-user', component: AddUserComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'offresemploi', component: OffresEmploiComponent },
  { path: 'offre-form', component: OffreFormComponent, canActivate: [AuthGuard, RecruiterGuard] },
  { path: 'candidat-form/:id', component: CandidatFormComponent, canActivate: [AuthGuard, CandidateGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard, RecruiterGuard] },
  { path: 'mesCandidatures', component: MesCandidaturesComponent, canActivate: [AuthGuard, CandidateGuard] },
  { path: 'candidatures/:id', component: CandidaturesComponent, canActivate: [AuthGuard, RecruiterGuard] },
  { path: 'candidat/file', component: FileUploadComponent, canActivate: [AuthGuard, CandidateGuard] },
  { path: 'profilCandidat', component: ProfilCandidatComponent, canActivate: [AuthGuard, CandidateGuard] },
  { path: 'editProfil', component: EditProfilCandidatComponent, canActivate: [AuthGuard, CandidateGuard] },
  { path: 'loading', component: LoadingComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
