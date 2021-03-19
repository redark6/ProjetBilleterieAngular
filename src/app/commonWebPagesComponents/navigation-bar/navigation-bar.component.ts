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
  constructor(private user: UserService) { }

  ngOnInit(): void {
    this.authSubscription = this.user.authListener().subscribe(state => {
      this.isAuthenticate = state;
    });
  }

  logout(): void{
    this.user.logout();
  }

}
