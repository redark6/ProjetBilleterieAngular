import { Component, OnInit } from '@angular/core';
import {Event} from '../../modeles/event';
import {UserService} from '../../services/user.service';
import {EventService} from '../../services/event.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-my-event',
  templateUrl: './my-event.component.html',
  styleUrls: ['./my-event.component.css']
})
export class MyEventComponent implements OnInit {
  eventList: Event[];

  constructor() {
  }

  ngOnInit(): void {

  }

}
