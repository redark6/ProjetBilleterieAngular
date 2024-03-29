import { Component } from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {GlobalParameter} from './specialClass/global-parameter';
import {UserService} from './services/user.service';
import {CommonDataService} from './services/common-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'projetBilleterieAngular';

  constructor(private router: Router, private globalVar: GlobalParameter, private authenticationService: UserService, private commondata: CommonDataService) {
    this.router.events.subscribe(
      (event: any) => {
        if (event instanceof NavigationEnd) {
          this.authenticationService.isSessionValid();
          this.authenticationService.getAuthority();
          this.globalVar.currentRoute = this.router.url;
          window.scrollTo(0, 0);
        }
      }
    );

    this.commondata.getRegions().subscribe(value => {
      this.globalVar.regionList = value;
    });

  }

}
