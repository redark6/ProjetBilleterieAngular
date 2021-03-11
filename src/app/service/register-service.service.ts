import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {User} from '../webPages/profil/user';

interface ReturnedErrors{
  errors: object;
}

@Injectable({
  providedIn: 'root'
})

export class RegisterServiceService {

  constructor(private httpClient: HttpClient) { }

  register(value: object): Observable <ReturnedErrors>{
    console.log(value);
    return this.httpClient.post<ReturnedErrors>('http://localhost:8080/user/create', value);

  }

  // getUser(id: string): Observable<User>{
   // return this.httpClient.get<User>('http://localhost:8000/users/' + id);
  // }
}
