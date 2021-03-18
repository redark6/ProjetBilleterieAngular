import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../webPages/profil/user';
import {EventTicket} from '../webPages/event/eventTicket';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private httpClient: HttpClient) { }

  public get(): Observable<User>{

    return this.httpClient.get<User>(`http://localhost:8080/user/logeduser`);
  }
}
