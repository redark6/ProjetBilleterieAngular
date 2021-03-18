import { Component, OnInit } from '@angular/core';
import {GlobalParameter} from '../../specialClass/global-parameter';
import {AuthenticationService} from '../../service/authentication.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {
  isAuthenticate: boolean;
  authSubscription: Subscription;
  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.authSubscription = this.authenticationService.authListener().subscribe(state => {
      this.isAuthenticate = state;
    });
  }

  logout(): void{
    this.authenticationService.logout();
  }

}
