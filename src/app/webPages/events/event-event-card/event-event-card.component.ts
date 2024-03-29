import {Component, Input, OnInit} from '@angular/core';
import {Event} from '../../../modeles/event';
import {EventService} from '../../../services/event.service';
import {GlobalParameter} from '../../../specialClass/global-parameter';
import {DomSanitizer} from '@angular/platform-browser';
import {UserService} from '../../../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-event-event-card',
  templateUrl: './event-event-card.component.html',
  styleUrls: ['./event-event-card.component.css']
})
export class EventEventCardComponent implements OnInit {
  @Input() event: Event;
  public eventId: number;
  public eventImage: any;
  region: string;
  isAuthenticate: boolean;
  isOwner = false;
  constructor(private globalVar: GlobalParameter, private eventService: EventService, private domSanitizer: DomSanitizer, private user: UserService, private route: Router) { }

  categories: string[] = [
    'none',
    'Cour et Atelier', 'Festival', 'Salon', 'Action solidaire', 'Concert',
    'Gastronomie', 'Conférence et Forum', 'Musée et Exposition', 'Spectacle et Théâtre',
    'Autres'];

  ngOnInit(): void {
    this.eventId = this.event.id;

    console.log('AVANT CALL');
    this.eventService.getImage(this.eventId).subscribe((image) => {
      console.log('a linterieur');
      this.eventImage = this.domSanitizer.bypassSecurityTrustUrl('data:image/jpg;base64,' + image);
    });


    this.region = this.globalVar.regionList[this.event.region - 1].regionName;


    this.eventService.isOwner(this.event.id).subscribe(value1 => {
      this.isOwner = value1;
    });

    this.user.authListener().subscribe(state => {
      this.isAuthenticate = state;
    });
  }

  stop(event): void {
    event.stopPropagation();
  }

}
