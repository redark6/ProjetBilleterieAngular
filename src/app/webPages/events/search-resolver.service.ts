import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService implements Resolve<any> {
  constructor(private httpClient: HttpClient) {
  }
  resolve(): Observable<any> {
    return this.httpClient.get('https://5a530e1477e1d20012fa066a.mockapi.io/employeedata');
  }
}
