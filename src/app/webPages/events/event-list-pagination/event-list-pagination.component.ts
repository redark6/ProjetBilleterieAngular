import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-event-list-pagination',
  templateUrl: './event-list-pagination.component.html',
  styleUrls: ['./event-list-pagination.component.css']
})
export class EventListPaginationComponent implements OnInit {
  @Input() currentPage: number;
  @Input() numberOfpages: number;
  paginationLinks = 7;
  startIndex;
  constructor() { }

  ngOnInit(): void {
    console.log(this.numberOfpages);
    this.startIndex = this.getStartIndex();
  }

  getStartIndex(): number{
    if (this.currentPage + this.paginationLinks < this.numberOfpages){ return (this.currentPage); }
    if (this.currentPage + this.paginationLinks > this.numberOfpages){
      if (this.numberOfpages > this.paginationLinks){
        return (this.numberOfpages - this.paginationLinks + 1);
      }
      else{
        return 1;
      }
    }
  }

}
