import { Component, OnInit } from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {SearchResult} from '../../modeles/searchResult';
import {EventService} from '../../services/event.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  searchResultSubscription: Subscription;
  searchResult: SearchResult;
  constructor(private event: EventService) { }

  ngOnInit(): void {
    this.searchResultSubscription = this.event.searchListener().subscribe(data => {
      console.log(data);
      this.searchResult = data;
    });

  }

}

