import {Component, OnInit} from '@angular/core';
import {Event} from '../../modeles/event';
import {EventService} from '../../services/event.service';
import {ActivatedRoute} from '@angular/router';
import {Rating} from '../../modeles/rating';
import {User} from '../../modeles/user';
import {UserService} from '../../services/user.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

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
  closeResult = '';

  constructor(private user: UserService, private eventService: EventService, private activatedRoute: ActivatedRoute,
              private modalService: NgbModal) {
  }

  ngOnInit(): void {

    this.activatedRoute.data.subscribe((data: { event: Event }) => this.event = data.event);

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
    }

    rate(): void{
    this.rating = new Rating(this.activatedRoute.snapshot.params.id, this.userProfilInfos.email, this.value2);
    this.eventService.rate(this.rating);
    this.event = this.activatedRoute.snapshot.data.event;
  }
  open(content): void {



    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      // this.user.upgradeOrganiser(this.upgradeOrganiserForm.value);
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  isOwner(): boolean{
    let bool = false;
    this.eventService.isOwner(this.eventId).subscribe(isOwner => {
      if (isOwner === true){
        bool = true;
      }
      else{
        bool = false;
      }
    });
    return bool;
  }


  update(): void {

  }
}
