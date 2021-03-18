import { Component } from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {GlobalParameter} from './specialClass/global-parameter';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'projetBilleterieAngular';

  constructor(private router: Router, private globalVar: GlobalParameter) {
    this.router.events.subscribe(
      (event: any) => {
        if (event instanceof NavigationEnd) {
          this.globalVar.currentRoute = this.router.url;
        }
      }
    );
  }
}
