import {Component, Input, OnInit} from '@angular/core';
import {Event} from '../../../modeles/event';
import {Router} from '@angular/router';
import {GlobalParameter} from '../../../specialClass/global-parameter';

@Component({
  selector: 'app-event-event-card',
  templateUrl: './event-event-card.component.html',
  styleUrls: ['./event-event-card.component.css']
})
export class EventEventCardComponent implements OnInit {
  @Input() event: Event;
  region: string;
  constructor(private globalVar: GlobalParameter) { }

  categories: string[] = [
    'none',
    'Cour et Atelier', 'Festival', 'Salon', 'Action solidaire', 'Concert',
    'Gastronomie', 'Conférence et Forum', 'Musée et Exposition', 'Spectacle et Théâtre',
    'Autres'];

  ngOnInit(): void {
    this.region = this.globalVar.regionList[this.event.region].regionName;
  }

}
