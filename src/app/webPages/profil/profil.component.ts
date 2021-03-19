import {Component, OnInit} from '@angular/core';
import {User} from './user';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../service/user.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  public userProfilInfos: User;

  constructor(private user: UserService) {
  }

  ngOnInit(): void {
    this.user.getUserProfil().subscribe(user => {
      this.userProfilInfos = user;
    });
  }

}
