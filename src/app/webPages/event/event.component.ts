import {Component, OnInit} from '@angular/core';
import {EventTicket} from './eventTicket';
import {EventService} from '../../service/event.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  public event: EventTicket;

  constructor(private eventService: EventService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    // this.event = new EventTicket('titre: string', 'type: string', 'description: string', 'region: string', new Date(), 5, 20);
    this.eventService.get(this.activatedRoute.snapshot.params.id).subscribe(event => {
      this.event = event;
    });

  }

}
