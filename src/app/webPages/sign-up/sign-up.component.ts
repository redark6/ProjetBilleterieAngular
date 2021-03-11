import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RegisterServiceService} from '../../service/register-service.service';
import {Router} from '@angular/router';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private registerService: RegisterServiceService, private router: Router) {

    this.registerForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      userName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      birthDate: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      passwordConfirm: new FormControl('', [Validators.required])
    });


  }

  ngOnInit(): void {
  }

  addUser(): void {
    this.registerService.register(this.registerForm.value).subscribe(
      (errors) => {
        console.log(errors);
        return;
      },
      (error) => {
        return;
      }

    );
  }
}
