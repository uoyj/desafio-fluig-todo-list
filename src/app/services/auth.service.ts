import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient, private _router: Router) { }

  login(usuario, senha){    
    let auth = 'Basic ZGVtbzpzU2R4T1lEQU0zRkJO';
    let tokenUrl = `https://app.fluigidentity.com/accounts/oauth/token?grant_type=password&response_type=token&client_id=demo&username=${usuario}&password=${senha}`

    return this._http.post<any>(tokenUrl, null, { headers: new HttpHeaders( {'Authorization': `${auth}`} ) });
  }

  logout(){
    localStorage.removeItem('token');
    this._router.navigate(['/home']);
    return;
  }

  isLogged(){
    return !!localStorage.getItem('token');
  }

  getToken(){
    if(this.isLogged()) return JSON.parse( localStorage.getItem('token') ).access_token;
    else return null;
  }

  refreshToken(){
    //
  }

}
