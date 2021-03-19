import { Component } from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {GlobalParameter} from './specialClass/global-parameter';
import {AuthenticationService} from './service/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'projetBilleterieAngular';

  constructor(private router: Router, private globalVar: GlobalParameter, private authenticationService: AuthenticationService) {
    this.router.events.subscribe(
      (event: any) => {
        if (event instanceof NavigationEnd) {
          this.globalVar.currentRoute = this.router.url;
          window.scrollTo(0, 0);
        }
      }
    );
    this.authenticationService.emitAuthStatus(false);
  }

}
