import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Event} from '../modeles/event';
import {SearchResult} from '../modeles/searchResult';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient: HttpClient) {}

  public get(id: number): Observable<Event> {
    return this.httpClient.get<Event>(`http://localhost:8080/event/${id}`);
  }

  searchEvents(params: HttpParams): void {
    this.httpClient.get<SearchResult>(`http://localhost:8080/event/search`, {params}).subscribe(
      value => {
      },
      error => {
        console.log(error);
      }
    );
  }
}
