import {AfterContentInit, AfterViewChecked, AfterViewInit, Component, Input, OnInit} from '@angular/core';
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
export class HomeEventListCategoryComponent implements OnInit, AfterContentInit {

  @Input() identifiant: string;
  @Input() text: string;
  @Input() params: HttpParams;

  rightbarid;
  leftbarid;
  searchResult: Event[];
  searchResultSubscription: Subscription;


  element;
  cursorPosition = { top: 0, left: 0, x: 0, y: 0 };
  fn;
  firstonmiddle = false;
  position = 'start';
  init = true;
  animation = true;

  numbers: number[];
  constructor(private eventService: EventService, private activatedRoute: ActivatedRoute ) {
    this.numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  }

  ngAfterContentInit(): void{


  }

  ngOnInit(): void {

    let paramlist = new HttpParams();

    Object.keys(this.params).forEach(function(item) {
      paramlist = paramlist.set(item, this.params[item]);
    });

    this.eventService.searchEventsForHome(paramlist).subscribe(
      value => {
        this.searchResult = value.eventList;
        if (this.searchResult.length < 4){
          this.animation = false;
        }
      },
      (error) => {
        console.log(error);

      }
    );

    this.fn = (e) => {

      this.cursorPosition = {
        // The current scroll
        left: this.element.scrollLeft,
        top: this.element.scrollTop,
        // Get the current mouse position
        x: e.clientX,
        y: e.clientY,
      };

      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', mouseUpHandler);

      // this.element.style.cursor = 'grabbing';
      this.element.style.userSelect = 'none';

      e.preventDefault();
      e.stopPropagation();
    };


    const mouseMoveHandler = (e) => {
      // How far the mouse has been moved
      const dx = e.clientX - this.cursorPosition.x;

      // Scroll the element
      this.element.scrollLeft = this.cursorPosition.left - dx ;

      this.animationhandler();

      e.preventDefault();
      e.stopPropagation();
    };



    const mouseUpHandler = () => {
      // this.element.style.cursor = 'grab';
      this.element.style.removeProperty('user-select');

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

  }


  animationhandler(): void{
    if (this.animation === true) {
      if (this.element.offsetWidth + this.element.scrollLeft >= this.element.scrollWidth - 1) {

        this.rightbarid.classList.remove('animation');
        void this.rightbarid.offsetWidth;
        this.rightbarid.classList.add('animation');
        this.position = 'end';

        this.rightbarid.style.borderColor = '#90A4AE';
        this.firstonmiddle = true;
      } else if (this.element.scrollLeft === 0 && !this.init) {

        this.leftbarid.classList.remove('animation');
        void this.leftbarid.offsetWidth;
        this.leftbarid.classList.add('animation');

        this.leftbarid.style.borderColor = '#90A4AE';
        this.firstonmiddle = true;
        this.position = 'start';
      } else {
        if (this.firstonmiddle || this.init) {

          if (this.init) {
            this.position = 'end';
          }

          if (this.position.includes('end')) {

            this.rightbarid.classList.remove('testanime');
            void this.rightbarid.offsetWidth;
            this.rightbarid.classList.add('testanime');
            void this.rightbarid.offsetWidth;
            this.rightbarid.classList.remove('animation');

            this.rightbarid.style.borderColor = '#2e9fb3';

          }

          void this.leftbarid.offsetWidth;

          if (this.position.includes('start')) {

            this.leftbarid.classList.remove('testanime');
            void this.leftbarid.offsetWidth;
            this.leftbarid.classList.add('testanime');
            void this.leftbarid.offsetWidth;
            this.leftbarid.classList.remove('animation');

            this.leftbarid.style.borderColor = '#2e9fb3';

          }


          this.firstonmiddle = false;
          if (this.init) {
            this.position = 'start';
            this.firstonmiddle = true;
          }
          this.init = false;
        }

      }
    }
  }

  initialize(): void{
    if (this.init){
      this.element = document.getElementById(this.identifiant);
      this.rightbarid = document.getElementById(this.identifiant + 'rightbar');
      this.leftbarid = document.getElementById(this.identifiant + 'leftbar');
      this.element.scrollLeft = 0;
      this.animationhandler();
    }
  }



}



