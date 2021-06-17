import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {Organiser} from '../../modeles/organiser';
import {HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-organisers',
  templateUrl: './organisers.component.html',
  styleUrls: ['./organisers.component.css']
})
export class OrganisersComponent implements OnInit {

  public userName: string;
  public organisers: Organiser[];
  params: HttpParams;
  userSearch: string;

  constructor(private userService: UserService) { }

  ngOnInit(): void {

    this.params = new HttpParams().set('search', '');
    this.userService.getOrganiserListInfo(this.params).subscribe(value => {this.organisers = value; });

   // this.userService.getOrganiserPhoto(this.userName).subscribe(image => {this.organiserImage = this.domSanitizer.bypassSecurityTrustUrl('data:image/jpg;base64,' + image); });
  }

  searchOrganisers(): void{
    this.params = new HttpParams().set('search', this.userSearch);
    this.userService.getOrganiserListInfo(this.params).subscribe(value => {this.organisers = value; });
  }

  test(): void {
    console.log('tes');
  }

}
