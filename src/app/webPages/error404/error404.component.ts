import { Component, OnInit } from '@angular/core';
import {EventService} from '../../services/event.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-error404',
  templateUrl: './error404.component.html',
  styleUrls: ['./error404.component.css']
})
export class Error404Component implements OnInit {

  numbers: number[];

  constructor() {
  }

  ngOnInit(): void {}


}
