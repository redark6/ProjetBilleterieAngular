import {Component, Input, OnInit} from '@angular/core';
import {Organiser} from '../../../modeles/organiser';
import {UserService} from '../../../services/user.service';
import {Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-organiser-card',
  templateUrl: './organiser-card.component.html',
  styleUrls: ['./organiser-card.component.css']
})
export class OrganiserCardComponent implements OnInit {
  @Input() organiser: Organiser;
  organiserImage: any;
  constructor(private userService: UserService, private router: Router, private domSanitizer: DomSanitizer,) { }

  ngOnInit(): void {
    this.userService.getOrganiserPhoto(this.organiser.userName).subscribe(image => {this.organiserImage = this.domSanitizer.bypassSecurityTrustUrl('data:image/jpg;base64,' + image); });

  }

}
