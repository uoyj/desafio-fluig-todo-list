import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';


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
      email: [null],
      senha: [null]
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
