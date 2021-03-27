import { Component, OnInit } from '@angular/core';
import {GlobalParameter} from '../../specialClass/global-parameter';
import {UserService} from '../../service/user.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {
  isAuthenticate: boolean;
  authSubscription: Subscription;
  roleSubscription: Subscription;
  authority: string;
  constructor(private user: UserService, private globalVar: GlobalParameter) { }

  ngOnInit(): void {
    this.authSubscription = this.user.authListener().subscribe(state => {
      this.isAuthenticate = state;
    });
    this.roleSubscription = this.user.roleListener().subscribe(state =>  {
      this.authority = state;
      console.log('globalvar: ' + state);
    });
  }

  logout(): void{
    this.user.logout();
  }

}
