import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http'
import { AuthService } from './auth.service';

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
      return next.handle(reqClone);
    } else return next.handle(req);
  }
}
