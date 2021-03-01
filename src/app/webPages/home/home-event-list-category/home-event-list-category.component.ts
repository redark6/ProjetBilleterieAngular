import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-home-event-list-category',
  templateUrl: './home-event-list-category.component.html',
  styleUrls: ['./home-event-list-category.component.css']
})
export class HomeEventListCategoryComponent implements OnInit {

  @Input() identifiant: string;

  public idtarget: string;

  numbers: number[];
  constructor() {
    this.numbers = Array(4).fill(4); // [4,4,4,4,4]
  }


  ngOnInit(): void {
    this.idtarget = '#' + this.identifiant;
  }

}
