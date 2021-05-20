import { Component, OnInit } from '@angular/core';
import {EventService} from '../../services/event.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-error404',
  templateUrl: './error404.component.html',
  styleUrls: ['./error404.component.css']
})
export class Error404Component implements OnInit {
  ele;
  pos = { top: 0, left: 0, x: 0, y: 0 };
  fn;

  numbers: number[];

  constructor() {
    this.numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

  }

  ngOnInit(): void {
    this.ele = document.getElementById('test');
    this.ele.scrollTop = 100;
    this.ele.scrollLeft = 150;




    this.fn = (e) => {
console.log('pass');

//this.changeBGColor();

      this.pos = {
        // The current scroll
        left: this.ele.scrollLeft,
        top: this.ele.scrollTop,
        // Get the current mouse position
        x: e.clientX,
        y: e.clientY,
      };

      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', mouseUpHandler);

      this.ele.style.cursor = 'grabbing';
      this.ele.style.userSelect = 'none';
    };


    const mouseMoveHandler = (e) => {
      // How far the mouse has been moved
      const dx = e.clientX - this.pos.x;
      const dy = e.clientY - this.pos.y;

      // Scroll the element
      this.ele.scrollTop = this.pos.top - dy ;
      this.ele.scrollLeft = this.pos.left - dx ;
    };



    const mouseUpHandler = (e) => {
      this.ele.style.cursor = 'grab';
      this.ele.style.removeProperty('user-select');

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);

      //this.changeBGColor2();

    };


  }

  changeBGColor() {
    const cols = document.querySelectorAll('a');
    console.log(cols);
    cols.forEach(element => {

      //element.setAttribute('pointer-events', 'none');
      element.style.pointerEvents = 'none';
    });
  }

  changeBGColor2() {
    const cols = document.querySelectorAll('a');
    console.log(cols);
    cols.forEach(element => {
      element.style.pointerEvents = 'auto';
    });
  }


  goto(e): void {
    alert(e.getAttribute('routerLink'));
  }
}
