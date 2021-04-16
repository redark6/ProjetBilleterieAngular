import {Component, Input, OnInit} from '@angular/core';
import {Event} from '../../../modeles/event';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  @Input() eventList: Event[];
  constructor() { }

  ngOnInit(): void {
  }

}
