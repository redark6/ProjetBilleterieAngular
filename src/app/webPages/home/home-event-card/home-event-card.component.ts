import {Component, Input, OnInit, } from '@angular/core';
import {Event} from '../../../modeles/event';

@Component({
  selector: 'app-home-event-card',
  templateUrl: './home-event-card.component.html',
  styleUrls: ['./home-event-card.component.css']
})
export class HomeEventCardComponent implements OnInit {
  @Input() event: Event;
  categories: string[] = [
    'none',
    'Cour et Atelier', 'Festival', 'Salon', 'Action solidaire', 'Concert',
    'Gastronomie', 'Conférence et Forum', 'Musée et Exposition', 'Spectacle et Théâtre',
    'Autres'];

  constructor() { }

  ngOnInit(): void {
  }

}
