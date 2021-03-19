import {Component, OnInit} from '@angular/core';
import {User} from './user';

import {UserService} from '../../service/user.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ageMatchRange} from '../../specialClass/custom-validator';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  updateProfilForm: FormGroup;
  public userProfilInfos: User;
  closeResult = '';

  constructor(private user: UserService, private modalService: NgbModal, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.userProfilInfos = new User('', '', new Date(), '', '', new Date());
    this.user.getUserProfil().subscribe(user => {
      this.userProfilInfos = user;
    });

    this.updateProfilForm = this.formBuilder.group({
        firstName: ['', Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50)
        ])],
        lastName: ['', Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50)
        ])],
        userName: ['', Validators.compose([
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(50)
        ])],
        birthDate: ['', Validators.compose([
          Validators.required,
          ageMatchRange
        ])]
      }
    );

  }

  open(content): void {
    this.firstName.setValue(this.userProfilInfos.firstName);
    this.lastName.setValue(this.userProfilInfos.lastName);
    this.userName.setValue(this.userProfilInfos.userName);
    this.birthDate.setValue(this.userProfilInfos.birthDate);

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.user.patch(this.updateProfilForm.value);
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

  get firstName(): AbstractControl {
    return this.updateProfilForm.get('firstName');
  }

  get lastName(): AbstractControl {
    return this.updateProfilForm.get('lastName');
  }

  get userName(): AbstractControl {
    return this.updateProfilForm.get('userName');
  }

  get birthDate(): AbstractControl {
    return this.updateProfilForm.get('birthDate');
  }

}
