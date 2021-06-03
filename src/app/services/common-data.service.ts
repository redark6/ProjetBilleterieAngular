import { Injectable } from '@angular/core';
import {EventComment} from '../modeles/eventComment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Region} from '../modeles/region';

@Injectable({
  providedIn: 'root'
})
export class CommonDataService {

  constructor(private httpClient: HttpClient) { }

  public getRegions(): Observable<Region[]> {
    return this.httpClient.get<Region[]>(`http://localhost:8080/commondata/regions`);
  }

}
