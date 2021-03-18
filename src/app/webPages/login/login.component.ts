import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../service/authentication.service';
import {HandleErrorsService} from '../../specialClass/handle-errors.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginError = false;
  loginErrorMessage: string;
  private cookieValue: string;

  // tslint:disable-next-line:max-line-length
  constructor(private authenticate: AuthenticationService, private formBuilder: FormBuilder, private error: HandleErrorsService) {

  }

  ngOnInit(): void {

    this.error.error403Event
      .subscribe((data: object) => {
        this.showLoginError();
      });


    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
      ])],
      password: ['', [Validators.required]]
    });
  }

  get email(): AbstractControl {
    return this.loginForm.get('email');
  }

  get password(): AbstractControl {
    return this.loginForm.get('password');
  }


  login(): void {
    this.authenticate.login(this.loginForm.value);
  }

  showLoginError(): void{
    this.loginError = true;
    this.loginErrorMessage = 'Identifiant ou mot de passe incorrect';
  }

}
