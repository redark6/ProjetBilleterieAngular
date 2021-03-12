import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {EventTicket} from '../webPages/event/eventTicket';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private httpClient: HttpClient) {}

  public get(id: number): Observable<EventTicket> {

    return this.httpClient.get<EventTicket>(`http://localhost:8080/event/${id}`);
  }
}
