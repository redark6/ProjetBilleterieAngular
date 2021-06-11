import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {EventService} from '../../services/event.service';
import {Event} from '../../modeles/event';
import {ObjectPipe} from '../../specialClass/object-pipe';

@Component({
  selector: 'app-my-event',
  templateUrl: './my-event.component.html',
  styleUrls: ['./my-event.component.css']
})
export class MyEventComponent implements OnInit {
  public userEventList: Event[];
  sortedEventsObject: object;
  finalsort: any;



  monthList = ['Décembre', 'Novembre', 'Octobre', 'Septembre', 'Août', 'Juillet',
    'Juin', 'Mai', 'Avril', 'Mars', 'Févrié', 'Janvier'];

  constructor(private eventService: EventService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {

    this.eventService.getUserEvents().subscribe(userEvents => {
      this.userEventList = userEvents;


      this.sortedEventsObject = {};

      this.userEventList.forEach(event => {
        const date = this.sanitizeDate(event.creationDate);
        if (!this.sortedEventsObject[date.year]){
          this.sortedEventsObject[date.year] = {};
        }

        if (!this.sortedEventsObject[date.year][date.month]){
          this.sortedEventsObject[date.year][date.month] = new Array();
        }

        this.sortedEventsObject[date.year][date.month].push(event);
        console.log(this.sortedEventsObject);
      });

    });
    //this.finalsort = Object.keys(this.sortedEventsObject);
  }

  sanitizeDate(datereceived): any {
    const date = new Date(datereceived);
    date.setMinutes(Math.abs(date.getTimezoneOffset()));
    let finaldate;
    finaldate = {};
    finaldate.year = date.toISOString().substring(0, 4);
    finaldate.month = date.toISOString().substring(5, 7);
    if (finaldate.month.charAt(0) === '0'){

      finaldate.month = finaldate.month.substring(1);
    }
    finaldate.month = Math.abs(Number(finaldate.month) - 12).toString(10);
    return finaldate;
  }

}
