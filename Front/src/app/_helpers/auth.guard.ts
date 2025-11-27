import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../_services/token-storage.service';
import { AuthService } from '../_services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  implements CanActivate{

  constructor(private tokenStorage: TokenStorageService,private authService:AuthService,private router: Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if (this.tokenStorage.isLoggedin()) {//&& this.tokenStorage.getToken() != undefined && this.tokenStorage.isAuthenticated()) {
        //console.log('isAuthenticated '+this.tokenStorage.isAuthenticated())
        return true;
      }
      else {
        this.tokenStorage.signOut();
        this.router.navigateByUrl("/login");
        return false;
      }
  }
}
