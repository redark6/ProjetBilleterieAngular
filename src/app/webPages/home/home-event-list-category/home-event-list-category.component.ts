import {Component, Input, OnInit} from '@angular/core';
import {EventTicket} from '../../event/eventTicket';
import {EventService} from '../../../service/event.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-home-event-list-category',
  templateUrl: './home-event-list-category.component.html',
  styleUrls: ['./home-event-list-category.component.css']
})
export class HomeEventListCategoryComponent implements OnInit {

  @Input() identifiant: string;

  public idtarget: string;

  public events: Array<EventTicket>;

  public eventsSport: Array<EventTicket>;

  public eventsMusic: Array<EventTicket>;

  numbers: number[];
  constructor(private eventService: EventService, private activatedRoute: ActivatedRoute) {

    this.events = new Array<EventTicket>();
    this.eventService.getAllRecent().subscribe(events => {
      this.events = events;
    });

    this.eventsMusic = new Array<EventTicket>();
    this.eventService.getAllMusic().subscribe(eventsMusic => {
      this.eventsMusic = eventsMusic;
    });

    this.eventsSport = new Array<EventTicket>();
    this.eventService.getAllSport().subscribe(eventsSport => {
      this.eventsSport = eventsSport;
    });

  }

  ngOnInit(): void {
    this.idtarget = '#' + this.identifiant;

  }



}
