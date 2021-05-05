import {Component, OnInit} from '@angular/core';
import {Event} from '../../modeles/event';
import {EventService} from '../../services/event.service';
import {ActivatedRoute} from '@angular/router';
import {NzRateModule} from 'ng-zorro-antd/rate';
import {Rating} from '../../modeles/rating';
import {User} from '../../modeles/user';
import {UserService} from '../../services/user.service';
import {Observable} from 'rxjs';

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
  public userProfilInfos: User;


  constructor(private user: UserService, private eventService: EventService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    // this.event = new Event('titre: string', 'type: string', 'description: string', 'region: string', new Date(), 5, 20);
    this.event = new Event(1, 'titre: string', 5, 'description: string', 'region: string', new Date(), new Date(), new Date(), 5, 20);
    this.eventService.get(this.activatedRoute.snapshot.params.id).subscribe(event => {
      this.event = event;
    });


    this.eventService.getRating(this.activatedRoute.snapshot.params.id).subscribe(value => {
      this.value = value;
    });

    this.userProfilInfos = new User('', '', new Date(), '', '', new Date());
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

  }

  rate(): void{
    this.rating = new Rating(this.activatedRoute.snapshot.params.id, this.userProfilInfos.email, this.value2);
    this.eventService.rate(this.rating);
    this.event = this.activatedRoute.snapshot.data.event;
  }

}
