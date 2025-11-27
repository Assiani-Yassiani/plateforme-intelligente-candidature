import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputMaskModule } from 'primeng/inputmask';
import { CalendarModule } from 'primeng/calendar';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { AuthGuard } from './_helpers/auth.guard';
import { ErrorInterceptor } from './_helpers/error.interceptor';

// Import all your components here
import { NavbarComponent } from './navbar/navbar.component';
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
import { UsersListComponent } from './users-list/users-list.component';
import { Forg1Component } from './forg1/forg1.component';
import { Forg2Component } from './forg2/forg2.component';
import { Forg3Component } from './forg3/forg3.component';
import { AdminComponent } from './admin/admin.component';
import { TestComponent } from './test/test.component';
import { CreateTestTechniqueComponent } from './create-test-technique/create-test-technique.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    ErrorComponent,
    OffreEmploiComponent,
    TestComponent,
    ResetPasswordComponent,
    NewPasswordComponent,
    OffresEmploiComponent,
    OffreFormComponent,
    CandidatFormComponent,
    DashboardComponent,
    MesCandidaturesComponent,
    CandidaturesComponent,
    FileUploadComponent,
    ProfilCandidatComponent,
    EditProfilCandidatComponent,
    LoadingComponent,
    NotFoundComponent,
    UsersListComponent,
    Forg1Component,
    Forg2Component,
    Forg3Component,
    AdminComponent,
    CreateTestTechniqueComponent,
    AddUserComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MultiSelectModule,
    InputMaskModule,
    CalendarModule
  ],
  providers: [
    AuthGuard,
    authInterceptorProviders,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
