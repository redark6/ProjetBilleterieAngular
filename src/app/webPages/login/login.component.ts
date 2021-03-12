import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  private cookieValue: string;

  constructor(private authenticate: AuthenticationService, private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
      ])),
      password: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
  }


  login(): void {
    this.authenticate.authenticate(this.loginForm.value).subscribe(
      (cookie) => {
        this.authenticate.test(this.loginForm.value).subscribe(
          (cookie2) => {

          },
          (error) => {
            return;
          }


        );
        return this.router.navigate(['home']);
      },
      (error) => {
        return;
      }

    );
  }

}
