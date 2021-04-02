import {Component, Input, OnInit} from '@angular/core';
import {Event} from '../../../modeles/event';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css']
})
export class EventsListComponent implements OnInit {
  @Input() eventList: Event[];
  constructor() {
  }

  ngOnInit(): void {
    this.eventList.forEach(value => {
      console.log(value);
    });
  }

}
