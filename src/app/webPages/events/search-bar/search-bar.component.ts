import { Component, OnInit } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';
import {NgbDate, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';

import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';

export interface Fruit {
  name: string;
}

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  minValue: number = 50;
  maxValue: number = 200;
  options: Options = {
    floor: 0,
    ceil: 250
  };
  constructor() {

  }

  ngOnInit(): void {
  }




}
