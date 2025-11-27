import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor() { }

  signOut(): void {
    localStorage.clear();
  }

  public saveToken(token: string): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  public isAuth(): Observable<boolean> {
    const isAuth = localStorage.getItem(TOKEN_KEY)
    return of(isAuth ? true : false)
  }

  public isLoggedin() {
    const isAuth = localStorage.getItem(TOKEN_KEY)
    return isAuth ? true : false
  }

  public saveUser(user: any): void {
    localStorage.removeItem(USER_KEY);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = localStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

  public getUsersAsObservable(): Observable<any> {
    let user = localStorage.getItem(USER_KEY);
    if (user) {
      let userValue = JSON.parse(user);
      return of(userValue);
    }
    return of(null)
  }

  public getRole() {
    let user = localStorage.getItem(USER_KEY);
    if (user) {
      let userValue = JSON.parse(user);
      return userValue.role;
    }
    return of(null)
  }

  public getRolesAsObservable(): Observable<any> {
    let user = localStorage.getItem(USER_KEY);
    if (user) {
      let userValue = JSON.parse(user);
      return of(userValue.role);
    }
    return of(null)
  }

  saveidconduiat(id: any) {
    localStorage.setItem("idc", id.toString());

  }

  getidconduiat() {
   return  localStorage.getItem("idc");

  }


}
