import {Component, Input, OnInit} from '@angular/core';
import {Event} from '../../../modeles/event';

@Component({
  selector: 'app-event-event-card',
  templateUrl: './event-event-card.component.html',
  styleUrls: ['./event-event-card.component.css']
})
export class EventEventCardComponent implements OnInit {
  @Input() event: Event;
  constructor() { }

  categories: string[] = [
    'none',
    'Cour et Atelier', 'Festival', 'Salon', 'Action solidaire', 'Concert',
    'Gastronomie', 'Conférence et Forum', 'Musée et Exposition', 'Spectacle et Théâtre',
    'Autres'];

  ngOnInit(): void {
  }

}
