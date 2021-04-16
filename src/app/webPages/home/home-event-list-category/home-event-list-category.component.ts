import {Component, Input, OnInit} from '@angular/core';
import {Event} from '../../../modeles/event';
import {EventService} from '../../../services/event.service';
import {ActivatedRoute} from '@angular/router';
import {HttpParams} from '@angular/common/http';
import {SearchResult} from '../../../modeles/searchResult';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-home-event-list-category',
  templateUrl: './home-event-list-category.component.html',
  styleUrls: ['./home-event-list-category.component.css']
})
export class HomeEventListCategoryComponent implements OnInit {

  @Input() identifiant: string;
  @Input() text: string;
  @Input() params: HttpParams;

  searchResult: Event[];
  searchResultSubscription: Subscription;

  public idtarget: string;

  numbers: number[];
  constructor(private eventService: EventService, private activatedRoute: ActivatedRoute ) {
    this.numbers = [1, 2, 3, 4];

  }

  ngOnInit(): void {
    this.eventService.searchEvents(this.params);
    this.searchResultSubscription = this.eventService.searchListener().subscribe(state => {
      this.searchResult = state.eventList;
    });
    this.idtarget = '#' + this.identifiant;
  }

}
