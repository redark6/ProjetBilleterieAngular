import {Component, Input, OnInit, } from '@angular/core';
import {Event} from '../../modeles/event';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css']
})
export class EventCardComponent implements OnInit {
  @Input() event: Event;
  @Input() type: string;
  constructor() { }

  ngOnInit(): void {
  }

}
