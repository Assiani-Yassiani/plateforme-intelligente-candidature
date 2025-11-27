import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8080/api/auth/'; // api url

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  role: any
  constructor(private http: HttpClient) { }


  setLoggedInStatus(value: boolean): void {
    this.isLoggedIn = value;
  }
  login(email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      email,
      password
    }, httpOptions);
  }

  register(email: string, password: string): Observable<any> {
    this.role = "candidat"
    return this.http.post(AUTH_API + 'signup', {
      'email': email,
      'password': password,
      'role': 'candidat'


    }, httpOptions);
  }
  create(email: string, password: string, role: String): Observable<any> {

    return this.http.post(AUTH_API + 'users', {
      'email': email,
      'password': password,
      'role': role
    }, httpOptions);
  }
  forg(email: string,): Observable<any> {
    return this.http.post(AUTH_API + 'Forget', {
      email,

    }, httpOptions);
  }
  get_code(email: any): Observable<any> {
    return this.http.get(AUTH_API + 'code' + "/" + email, httpOptions);
  }
  delete_code(id: any): Observable<any> {
    return this.http.delete(AUTH_API + 'code' + "/" + id, httpOptions);
  }
  rest_password(email: any, password: any): Observable<any> {
    return this.http.post(AUTH_API + 'rest_password', {
      email,
      password,

    }, httpOptions);
  }

}