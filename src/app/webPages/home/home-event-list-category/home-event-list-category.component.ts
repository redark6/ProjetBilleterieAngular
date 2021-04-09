import {Component, Input, OnInit} from '@angular/core';
import {Event} from '../../../modeles/event';
import {EventService} from '../../../services/event.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-home-event-list-category',
  templateUrl: './home-event-list-category.component.html',
  styleUrls: ['./home-event-list-category.component.css']
})
export class HomeEventListCategoryComponent implements OnInit {

  @Input() identifiant: string;

  public idtarget: string;

  public events: Array<Event>;

  public eventsSport: Array<Event>;

  public eventsMusic: Array<Event>;

  numbers: number[];
  constructor(private eventService: EventService, private activatedRoute: ActivatedRoute) {
    this.numbers = [1, 2, 3, 4];


  }

  ngOnInit(): void {
    this.idtarget = '#' + this.identifiant;

  }



}
