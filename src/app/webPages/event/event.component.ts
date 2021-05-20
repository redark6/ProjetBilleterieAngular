import {Component, OnInit} from '@angular/core';
import {Event} from '../../modeles/event';
import {EventService} from '../../services/event.service';
import {ActivatedRoute} from '@angular/router';
import {Rating} from '../../modeles/rating';
import {User} from '../../modeles/user';
import {UserService} from '../../services/user.service';
import {GlobalParameter} from '../../specialClass/global-parameter';
import {EventImage} from '../../modeles/eventImage';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  public event: Event;
  public value: number;
  public value2: number;
  public rating: Rating;
  public eventId: number;
  public userProfilInfos: User;
  public region: string;
  public eventImage: any;
  public eventImageByte: string;

  categories: string[] = [
    'none',
    'Cour et Atelier', 'Festival', 'Salon', 'Action solidaire', 'Concert',
    'Gastronomie', 'Conférence et Forum', 'Musée et Exposition', 'Spectacle et Théâtre',
    'Autres'];

  constructor(private user: UserService, private eventService: EventService, private activatedRoute: ActivatedRoute, private globalVar: GlobalParameter) {
  }

  ngOnInit(): void {

    this.activatedRoute.data.subscribe((data: { event: Event }) => this.event = data.event);

    this.region = this.globalVar.regionList[this.event.region].regionName;

    this.eventId = this.activatedRoute.snapshot.params.id;

    this.eventService.getRating(this.activatedRoute.snapshot.params.id).subscribe(value => {
      this.value = value;
    });

    this.user.getUserProfil().subscribe(user => {
      this.userProfilInfos = user;
    });

    this.eventService.getUserRating(this.activatedRoute.snapshot.params.id).subscribe(value2 => {
      if (value2 === null){
          this.value2 = 0;
        }
        else{
          this.value2 = value2;
        }
      });

    console.log('AVANT CALL');
    this.eventService.getImage(this.eventId).subscribe((image) => {
      console.log('a linterieur');
      console.log(image.image);
      this.eventImage = image.image;
    });
    }

    rate(): void{
    this.rating = new Rating(this.activatedRoute.snapshot.params.id, this.userProfilInfos.email, this.value2);
    this.eventService.rate(this.rating);
    this.event = this.activatedRoute.snapshot.data.event;
  }

}
