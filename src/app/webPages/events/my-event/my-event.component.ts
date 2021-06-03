import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {EventService} from '../../../services/event.service';
import {Event} from '../../../modeles/event';

@Component({
  selector: 'app-my-event',
  templateUrl: './my-event.component.html',
  styleUrls: ['./my-event.component.css']
})
export class MyEventComponent implements OnInit {
  public userEventList: Event[];

  constructor(private eventService: EventService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.eventService.getUserEvents().subscribe(userEvents => {
      this.userEventList = userEvents;
    });
  }

}
