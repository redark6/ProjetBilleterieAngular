import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private httpClient: HttpClient) {}

  public getmap(localisation: string): Observable<any> {
    return this.httpClient.get<any>(`http://nominatim.openstreetmap.org/search?format=json&q=` + localisation + `&polygon_geojson=1`, {withCredentials: false});
  }

}
