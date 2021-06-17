import { Component, OnInit } from '@angular/core';
import {Organiser} from '../../modeles/organiser';
import {UserService} from '../../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {EventService} from '../../services/event.service';
import {HttpParams } from '@angular/common/http';
import {SearchResult} from '../../modeles/searchResult';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-organiser-page',
  templateUrl: './organiser-page.component.html',
  styleUrls: ['./organiser-page.component.css']
})
export class OrganiserPageComponent implements OnInit {

  public organiser: Organiser;
  public userName: string;
  public organiserImage: any;
  searchResult: SearchResult;
  searchResultSubscription: Subscription;


  constructor(private userService: UserService, private router: Router, private domSanitizer: DomSanitizer, private event: EventService,private eventService: EventService) { }

  ngOnInit(): void {

    this.userName = this.router.url.substring(16);

    const params = new HttpParams().set('owner', this.userName).set('allEvent', 'true');
    this.event.searchEvents(params);

    this.searchResultSubscription = this.eventService.searchListener().subscribe(state => {
      this.searchResult = state;
    });

    this.userName = this.router.url.substring(16);

    this.userService.getOrganiserInfo(this.userName).subscribe(value => {this.organiser = value; });

    this.userService.getOrganiserPhoto(this.userName).subscribe(image => {this.organiserImage = this.domSanitizer.bypassSecurityTrustUrl('data:image/jpg;base64,' + image); });
  }

}
