import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {MyErrorStateMatcher} from '../../specialClass/my-error-state-matcher';
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
  matcher = new MyErrorStateMatcher();

  // tslint:disable-next-line:max-line-length
  constructor(private user: UserService, private formBuilder: FormBuilder, private error: HandleErrorsService) {

  }

  ngOnInit(): void {

    this.error.error403Event
      .subscribe((data: object) => {
        this.showLoginError();
        this.loginForm.setErrors({incorrect: true});
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
    this.user.login(this.loginForm.value);
  }

  showLoginError(): void{
    this.loginError = true;
    this.loginErrorMessage = 'Identifiant ou mot de passe incorrect';
  }

}
