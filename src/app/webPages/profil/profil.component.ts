import {Component, OnInit} from '@angular/core';
import {User} from './user';
import {ProfileService} from '../../service/profile.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  public user: User;

  constructor(private profilService: ProfileService) {
  }

  ngOnInit(): void {
    this.user = new User('', '', new Date(), '', '', new Date());

    this.profilService.get().subscribe(user => {
      this.user = user;
    });
  }

}
