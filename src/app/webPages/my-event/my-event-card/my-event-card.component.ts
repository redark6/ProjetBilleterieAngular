import {Component, Input, OnInit} from '@angular/core';
import {Event} from '../../../modeles/event';
import {Router} from '@angular/router';
import {EventService} from '../../../services/event.service';
import {GlobalParameter} from '../../../specialClass/global-parameter';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-my-event-card',
  templateUrl: './my-event-card.component.html',
  styleUrls: ['./my-event-card.component.css']
})
export class MyEventCardComponent implements OnInit {

  @Input() event: Event;
  categories: string[] = [
    'none',
    'Cour et Atelier', 'Festival', 'Salon', 'Action solidaire', 'Concert',
    'Gastronomie', 'Conférence et Forum', 'Musée et Exposition', 'Spectacle et Théâtre',
    'Autres'];
  isDown = false;
  timer;
  public eventId: number;
  public eventImage: any;
  region: string;
  activatedState: string;
  constructor(private route: Router, private eventService: EventService, private globalVar: GlobalParameter, private domSanitizer: DomSanitizer ) { }

  ngOnInit(): void {

    this.eventId = this.event.id;

    console.log('AVANT CALL');
    this.eventService.getImage(this.eventId).subscribe((image) => {
      console.log('a linterieur');
      this.eventImage = this.domSanitizer.bypassSecurityTrustUrl('data:image/jpg;base64,' + image);
    });

    this.region = this.globalVar.regionList[this.event.region - 1].regionName;

    this.boutonActiveChange(this.event.active);
  }

  sanitizeDate(datereceived): any {
    const date = new Date(datereceived);
    date.setMinutes(Math.abs(date.getTimezoneOffset()));
    const finaldate = date.toISOString().substring(0, 10);
    return finaldate;
  }

  eventManagment(event): void {
    this.eventService.eventManagment(event).subscribe(value => {
      this.event.active = value;
      this.boutonActiveChange(value);
    });
  }

  stop(event): void {
    event.stopPropagation();
  }

  boutonActiveChange(check: boolean): void{

    if (check === true){
      this.activatedState = 'Desactiver';
    }
    if (check === false){
      this.activatedState = 'Activer';
    }
  }
}
