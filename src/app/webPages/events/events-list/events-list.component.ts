import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css']
})
export class EventsListComponent implements OnInit {
  numbers: number[];
  constructor() {
    this.numbers = Array(7).fill(4); // [4,4,4,4,4]
  }

  ngOnInit(): void {
  }

}
