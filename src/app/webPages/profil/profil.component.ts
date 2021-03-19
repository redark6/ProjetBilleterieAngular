import {Component, OnInit} from '@angular/core';
import {User} from './user';
import {ProfileService} from '../../service/profile.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  public user: User;
  closeResult = '';

  constructor(private profilService: ProfileService, private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.user = new User('', '', new Date(), '', '', new Date());

    this.profilService.get().subscribe(user => {
      this.user = user;
    });
  }

  rien(): void {

  }

  open(content): void {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
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


}
