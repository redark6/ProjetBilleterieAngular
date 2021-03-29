import { Component, OnInit } from '@angular/core';
import {GlobalParameter} from '../../specialClass/global-parameter';
import {UserService} from '../../service/user.service';
import {Subscription} from 'rxjs';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {
  isAuthenticate: boolean;
  authSubscription: Subscription;
  searchForm: FormGroup;

  constructor(private user: UserService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.authSubscription = this.user.authListener().subscribe(state => {
      this.isAuthenticate = state;
    });

    this.searchForm = this.formBuilder.group({
      search: ['']
    });
  }

  logout(): void{
    this.user.logout();
  }

  searchEvent(): any{
    return this.router.navigate(['events/' + this.searchContentBar]);
  }

  get searchContentBar(): string {
    return this.searchForm.get('search').value;
  }

}
