import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient) { }

  login(usuario, senha){    
    let auth = 'Basic ZGVtbzpzU2R4T1lEQU0zRkJO';
    let tokenUrl = `https://app.fluigidentity.com/accounts/oauth/token?grant_type=password&response_type=token&client_id=demo&username=${usuario}&password=${senha}`

    return this._http.post<any>(tokenUrl, null, { headers: new HttpHeaders( {'Authorization': `${auth}`} ) });
  }

  isLogged(){
    return !!localStorage.getItem('token');
  }
}
