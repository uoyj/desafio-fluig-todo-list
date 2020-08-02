import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http'
import { AuthService } from './auth.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptService implements HttpInterceptor{

  constructor(private _auth: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler){
    if(this._auth.isLogged()){
      let reqClone = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${this._auth.getToken()}`)
      });
      return next.handle(reqClone).pipe(catchError(error => {
        if( error instanceof HttpErrorResponse && error.status == 401){
          return this.unauthorizedHandler(req, next);
        } else return throwError(error);
      }));
    } else return next.handle(req);
  }

  unauthorizedHandler(req: HttpRequest<any>, next: HttpHandler){
    /*alterar para refreshToken*/
    this._auth.logout();
    return next.handle(req);
  }
}
