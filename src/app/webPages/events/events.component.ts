import { Component, OnInit } from '@angular/core';
import {SearchResult} from '../../modeles/searchResult';
import {EventService} from '../../services/event.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  searchResult: SearchResult;
  searchResultSubscription: Subscription;
  constructor(private eventService: EventService) { }
  ngOnInit(): void {
    this.searchResultSubscription = this.eventService.searchListener().subscribe(state => {
      this.searchResult = state;
    });
  }

}

