import {EventEmitter, Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Event} from '../modeles/event';
import {SearchResult} from '../modeles/searchResult';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private searchEvent = new BehaviorSubject<SearchResult>(null);
  constructor(private httpClient: HttpClient) {}

  public get(id: number): Observable<Event> {
    return this.httpClient.get<Event>(`http://localhost:8080/event/${id}`);
  }

  searchEvents(params: HttpParams): void {
    this.httpClient.get<SearchResult>(`http://localhost:8080/event/search`, {params}).subscribe(
      value => {
        this.emitSearchEvent(value);
      },
      error => {
        console.log(error);
      }
    );
  }

  searchListener(): Observable<SearchResult>{
    return this.searchEvent.asObservable();
  }

  emitSearchEvent(searchResult: SearchResult): void{
    this.searchEvent.next(searchResult);
  }

}
