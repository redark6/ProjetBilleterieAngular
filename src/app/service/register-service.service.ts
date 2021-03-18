import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

interface ReturnedErrors{
  errors: object;
}

@Injectable({
  providedIn: 'root'
})

export class RegisterServiceService {

  constructor(private httpClient: HttpClient) { }

  register(value: object): Observable <ReturnedErrors>{
    return this.httpClient.post<ReturnedErrors>('http://localhost:8080/user/create', value);

  }

}
