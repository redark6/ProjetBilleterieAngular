import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


interface Cookie{
  createdId: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient) { }


  authenticate(value: object): Observable<Cookie>{
    return this.httpClient.post<Cookie>('http://localhost:8080/login', value);
  }

}


