import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private router:Router,private authService: AuthService,private token:TokenStorageService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(request).pipe(
          tap({
              next: () => null,
              error: (err: HttpErrorResponse) => {
                  if ([401, 403].includes(err.status) )
                  this.token.signOut();
                  //window.location.href='http://localhost:808/'; // auto logout if 401 or 403 response returned from api

                  const error = err.error?.message || err.status;
                  console.log('error '+error)
                  return throwError(error);
              },
          })
      );
  }
}
