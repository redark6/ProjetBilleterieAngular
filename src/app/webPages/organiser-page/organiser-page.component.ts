import { Component, OnInit } from '@angular/core';
import {Organiser} from '../../modeles/organiser';
import {UserService} from '../../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-organiser-page',
  templateUrl: './organiser-page.component.html',
  styleUrls: ['./organiser-page.component.css']
})
export class OrganiserPageComponent implements OnInit {

  public organiser: Organiser;
  public userName: string;
  public organiserImage: any;

  constructor(private userService: UserService, private router: Router, private domSanitizer: DomSanitizer) { }

  ngOnInit(): void {

    console.log(this.router.url.substring(16));

    this.userName = this.router.url.substring(16);

    this.userService.getOrganiserInfo(this.userName).subscribe(value => {this.organiser = value; });

    this.userService.getOrganiserPhoto(this.userName).subscribe(image => {this.organiserImage = this.domSanitizer.bypassSecurityTrustUrl('data:image/jpg;base64,' + image); });
  }

}
