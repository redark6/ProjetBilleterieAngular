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
  searchState: string;
  searchLentgh: number;

  constructor(private eventService: EventService) {
  }

  ngOnInit(): void {
    this.searchResultSubscription = this.eventService.searchListener().subscribe(state => {
      this.searchResult = state;
      this.searchMessage();
    });

    const mql = window.matchMedia('(min-width:995px)');
    mql.addEventListener('change', () => {
      this.hideShowSearchBarViewportChange(mql);
    });

  }

  hideShowSearchBarViewportChange(mq): void {
    const x = document.getElementById('searchevent');

    if (mq.matches) {
      x.style.display = 'block';
    } else {
      x.style.display = 'none';
    }
  }

  searchMessage(): void {
    if (this.searchResult != null) {
      console.log(this.searchResult.eventList.length);
      this.searchLentgh = this.searchResult.eventList.length;
      if (this.searchLentgh > 0) {
        this.searchState = 'found';
      } else {
        this.searchState = 'notfound';
      }

    }
  }
}



