import {Component, Input, OnInit, } from '@angular/core';
import {Event} from '../../../modeles/event';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home-event-card',
  templateUrl: './home-event-card.component.html',
  styleUrls: ['./home-event-card.component.css']
})
export class HomeEventCardComponent implements OnInit {
  @Input() event: Event;
  categories: string[] = [
    'none',
    'Cour et Atelier', 'Festival', 'Salon', 'Action solidaire', 'Concert',
    'Gastronomie', 'Conférence et Forum', 'Musée et Exposition', 'Spectacle et Théâtre',
    'Autres'];
  isDown = false;
  timer;
  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  setnone(e): boolean{
    e.preventDefault();
    e.stopPropagation();
    console.log('icicliecked');
    return false;
  }

  downhandler(e){
    this.isDown = false;
    this.timer = setTimeout(() => {
      this.isDown = true;
    }, 120);
  }

  uphandler(e){
    if (this.isDown === false && this.timer !== undefined && this.timer !== 0 && this.timer !== null){
      this.route.navigate(['/event/' + this.event.id.toString(10)]);
    }else{
    }
    clearTimeout(this.timer);
  }


}
