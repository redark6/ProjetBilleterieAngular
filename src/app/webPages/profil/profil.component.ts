import {Component, OnInit} from '@angular/core';
import {User} from '../../modeles/user';

import {UserService} from '../../services/user.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ageMatchRange} from '../../specialClass/custom-validator';
import {Subscription} from 'rxjs';
import {Organiser} from '../../modeles/organiser';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  updateProfilForm: FormGroup;
  public userProfilInfos: User;
  closeResult = '';
  upgradeOrganiserForm: FormGroup;
  roleSubscription: Subscription;
  authority: string;
  public organiserProfilInfos: Organiser;
  updateOrganiserForm: FormGroup;

  constructor(private user: UserService, private modalService: NgbModal, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {

    this.user.getUserProfil().subscribe(user => {
      this.userProfilInfos = user;
    });

    this.organiserProfilInfos = new Organiser('', '', '', '', '', '', '', '');
    this.user.getOrganiserrProfil().subscribe(organiser => {
      this.organiserProfilInfos = organiser;
    });

    this.roleSubscription = this.user.roleListener().subscribe(state => {
      this.authority = state;
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

    this.upgradeOrganiserForm = this.formBuilder.group({
        jobTitle: ['', Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50)
        ])],
        phoneNumber: ['', Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50)
        ])],
        website: ['', Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50)
        ])],
        company: ['', Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50)
        ])],
        blog: ['', Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50)
        ])],
        proAddress: ['', Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50)
        ])],
        proCity: ['', Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50)
        ])],
        proCountry: ['', Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50)
        ])]
      }
    );

    this.updateOrganiserForm = this.formBuilder.group({
        jobTitle: ['', Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50)
        ])],
        phoneNumber: ['', Validators.compose([
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(50)
        ])],
        website: ['', Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50)
        ])],
        company: ['', Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50)
        ])],
        blog: ['', Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50)
        ])],
        proAddress: ['', Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50)
        ])],
        proCity: ['', Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50)
        ])],
        proCountry: ['', Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50)
        ])]
      }
    );

  }

  open(content): void {

    this.updateProfilForm.setValue({
      firstName: this.userProfilInfos.firstName,
      lastName: this.userProfilInfos.lastName,
      userName: this.userProfilInfos.userName,
      birthDate: this.userProfilInfos.birthDate,
    });

    this.updateOrganiserForm.setValue({
      jobTitle: this.organiserProfilInfos.jobTitle,
      phoneNumber: this.organiserProfilInfos.phoneNumber,
      website: this.organiserProfilInfos.website,
      company: this.organiserProfilInfos.company,
      blog: this.organiserProfilInfos.blog,
      proAddress: this.organiserProfilInfos.proAddress,
      proCity: this.organiserProfilInfos.proCity,
      proCountry: this.organiserProfilInfos.proCountry,
    });

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.user.patch(this.updateProfilForm.value);
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openUpgradeOrganiser(content): void {

    this.upgradeOrganiserForm.setValue({
      jobTitle: '',
      phoneNumber: '',
      website: '',
      company: '',
      blog: '',
      proAddress: '',
      proCity: '',
      proCountry: '',
    });

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.user.upgradeOrganiser(this.upgradeOrganiserForm.value);
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

  get jobTitle(): AbstractControl {
    return this.upgradeOrganiserForm.get('jobTitle');
  }

  get phoneNumber(): AbstractControl {
    return this.upgradeOrganiserForm.get('phoneNumber');
  }

  upgradeOrganiser(): void {
    this.user.upgradeOrganiser(this.upgradeOrganiserForm.value);
  }


  updateOrganiser(): void {
    this.user.patchOrganiser(this.updateOrganiserForm.value);
  }

  callInput(): void {
    document.getElementById('profilPictureInput').click();
  }

  onFileChanged(event): void {
    const file = event.target.files[0];
    this.user.patchProfilPicture(file).subscribe(
      value => {
        document.getElementById('profilPicture').setAttribute('src', value.profilPicture);

      }, error => {
        console.log(error);
      }
    );
  }
}
