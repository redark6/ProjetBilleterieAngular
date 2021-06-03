import {EventEmitter, Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Event} from '../modeles/event';
import {SearchResult} from '../modeles/searchResult';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';
import {EventImage} from '../modeles/eventImage';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private searchEvent = new BehaviorSubject<SearchResult>(null);
  constructor(private httpClient: HttpClient, private router: Router) {}

  public get(id: number): Observable<Event> {
    return this.httpClient.get<Event>(`http://localhost:8080/event/${id}`);
  }

  public getRating(id: number): Observable<number> {
    return this.httpClient.get<number>(`http://localhost:8080/rate/${id}`);
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

  searchEventsForHome(params: HttpParams): Observable<SearchResult> {
    return this.httpClient.get<SearchResult>(`http://localhost:8080/event/search`, {params});
  }

  rate(rating: object): void {
    this.httpClient.post<any>(`http://localhost:8080/rate`, rating).subscribe(
      () => {
        return null;
      },
      (error) => {
        console.log(error);

      }
    );
  }
  createEvent(value: object): Observable<Event>{
    return this.httpClient.post<Event>('http://localhost:8080/event/create', value);
  }

  sendImage(form): void{
    // console.log(eventImage.image);
    this.httpClient.post<any>('http://localhost:8080/event/eventimagepost', form).subscribe(() => {
        return null;
      },
      (error) => {
        console.log(error);

      });
  }


  //getImage(eventId: number): Observable<any>{
  //  const parametres = new HttpParams().set('eventId', eventId.toString() );
  //  console.log('Dans GET IMAGE');
  //  return this.httpClient.get<any>(`http://localhost:8080/event/eventimageget`, {params: parametres});
  //}


  getImage(eventId: number): Observable<string>{
    const parametres = new HttpParams().set('eventId', eventId.toString() );
    console.log('Dans GET IMAGE');
    return this.httpClient.get<ArrayBuffer>('http://localhost:8080/event/eventimageget', {params: parametres, responseType: 'arraybuffer' as 'json'})
  .pipe(
      map(
        (byteArray: ArrayBuffer) => this.arrayBufferToBase64(byteArray)
      )
    );
  }

  private arrayBufferToBase64(buffer): string {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  searchListener(): Observable<SearchResult>{
    return this.searchEvent.asObservable();
  }

  emitSearchEvent(searchResult: SearchResult): void{
    this.searchEvent.next(searchResult);
  }

  getUserRating(id: number): Observable<number> {
    return this.httpClient.get<number>(`http://localhost:8080/rate/userRating/${id}`);
  }

  isOwner(pageId: number): Observable<boolean> {
    return this.httpClient.get<boolean>(`http://localhost:8080/event/isOwner/${pageId}`);
  }

  patch(id: number, value: object): Observable<any>{
    return this.httpClient.patch(`http://localhost:8080/event/patch/${id}`, value);
  }

  ModifyImage(form: FormData): void {
    this.httpClient.patch<any>('http://localhost:8080/event/eventimagemodify', form).subscribe(() => {
        return null;
      },
      (error) => {
        console.log(error);

      });
  }
}
