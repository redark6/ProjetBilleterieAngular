import {Component, OnInit} from '@angular/core';
import {Event} from '../../modeles/event';
import {EventService} from '../../services/event.service';
import {ActivatedRoute} from '@angular/router';
import {NzRateModule} from 'ng-zorro-antd/rate';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  public event: Event;


  constructor(private eventService: EventService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    // this.event = new Event('titre: string', 'type: string', 'description: string', 'region: string', new Date(), 5, 20);
    this.event = new Event(1, 'titre: string', 5, 'description: string', 'region: string', new Date(),new Date(),new Date(), 5, 20);
    this.eventService.get(this.activatedRoute.snapshot.params.id).subscribe(event => {
      this.event = event;
    });


  }

}
