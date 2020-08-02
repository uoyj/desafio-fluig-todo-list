import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loginForm: FormGroup;
  loginError: boolean = false;

  constructor(private _formBuilder:FormBuilder, private _auth: AuthService,
              private _router: Router) { }

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      email: new FormControl(null, [
        Validators.required
      ]),
      senha: new FormControl(null, [
        Validators.required
      ])
    });
  }

  login(){
    let value = this.loginForm.value;
    this._auth.login(value.email, value.senha)
      .subscribe(token => {
        localStorage.setItem('token', JSON.stringify(token));
        this._router.navigate(['/lists']);
      }, error => {    
        this.loginError = true;
        console.error(error);
      });
  }

}
