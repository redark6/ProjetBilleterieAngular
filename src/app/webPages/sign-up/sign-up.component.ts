import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {passwordsMatch, ageMatchRange} from '../../specialClass/custom-validator';
import {HandleErrorsService} from '../../specialClass/handle-errors.service';
import {UserService} from '../../service/user.service';
import {MyErrorStateMatcher} from '../../specialClass/my-error-state-matcher';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  registerForm: FormGroup;
  registerError = false;
  matcher = new MyErrorStateMatcher();

  // tslint:disable-next-line:max-line-length
  constructor(private user: UserService, private router: Router, private formBuilder: FormBuilder, private error: HandleErrorsService) {

  }

  ngOnInit(): void {

    this.error.error409Event
      .subscribe((data: object) => {
        this.showRegisterError(data);
      });

    this.registerForm = this.formBuilder.group({
        firstName: ['', Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50)
        ])],
        lastName: ['', Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50)
        ])],
        userName: ['', Validators.compose([
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(50)
        ])],
        birthDate: ['', Validators.compose([
          Validators.required,
          ageMatchRange
        ])],
        email: ['', Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50),
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
        ])],
        password: ['', Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(16)
        ])],
        passwordConfirm: ['', Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(16)
        ])]
      }, {
        validator: passwordsMatch('password', 'passwordConfirm')
      }
    );
  }

  get firstName(): AbstractControl {
    return this.registerForm.get('firstName');
  }

  get lastName(): AbstractControl {
    return this.registerForm.get('lastName');
  }

  get userName(): AbstractControl {
    return this.registerForm.get('userName');
  }

  get email(): AbstractControl {
    return this.registerForm.get('email');
  }

  get birthDate(): AbstractControl {
    return this.registerForm.get('birthDate');
  }

  get password(): AbstractControl {
    return this.registerForm.get('password');
  }

  get passwordConfirm(): AbstractControl {
    return this.registerForm.get('passwordConfirm');
  }

  addUser(): void {
    this.user.register(this.registerForm.value);
  }

  showRegisterError(data: object): void {
    this.registerError = false;
    for (const [key, value] of Object.entries(data)) {
      switch (key) {
        case 'email':
          this.email.setErrors({incorrect: true});
          break;
        case 'userName':
          this.userName.setErrors({incorrect: true});
          break;
        case 'birthDate':
          this.birthDate.setErrors({incorrect: true});
          break;
      }
    }

  }

  date(birthDate): void {
    const date = new Date(birthDate.target.value);
    date.setHours(1);
    const convertDate = date.toISOString().substring(0, 10);
    this.registerForm.get('birthDate').setValue(convertDate, {
      onlyself: true
    });
  }

}
