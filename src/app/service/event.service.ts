import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {EventTicket} from '../webPages/event/eventTicket';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private httpClient: HttpClient) {}

  public get(id: number): Observable<EventTicket> {
    return this.httpClient.get<EventTicket>( environment.apiUrl + `/event/${id}`);
  }

  public getAll(): Observable<Array<EventTicket>> {
    return this.httpClient.get<Array<EventTicket>>( environment.apiUrl + `/event`);
  }

  public getAllRecent(): Observable<Array<EventTicket>> {
    return this.httpClient.get<Array<EventTicket>>( environment.apiUrl + `/event/Recent`);
  }

  public getAllSport(): Observable<Array<EventTicket>> {
    return this.httpClient.get<Array<EventTicket>>( environment.apiUrl + `/event/type/Sport`);
  }

  public getAllMusic(): Observable<Array<EventTicket>> {
    return this.httpClient.get<Array<EventTicket>>( environment.apiUrl + `/event/type/music`);
  }

  searchEvents(params: object): void {

    this.httpClient.post<object>( environment.apiUrl + `/event/search`, params).subscribe(
      () => {
        console.log('pass');
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
