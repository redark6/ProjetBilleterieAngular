import {EventEmitter, Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Event} from '../modeles/event';
import {SearchResult} from '../modeles/searchResult';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';
import {EventImage} from '../modeles/eventImage';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {Participation} from '../modeles/participation';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private searchEvent = new BehaviorSubject<SearchResult>(null);

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  public get(id: number): Observable<Event> {
    return this.httpClient.get<Event>(environment.apiUrl + `/event/${id}`);
  }

  public getRating(id: number): Observable<number> {
    return this.httpClient.get<number>(environment.apiUrl + `/rate/${id}`);
  }

  searchEvents(params: HttpParams): void {
    this.httpClient.get<SearchResult>(environment.apiUrl + `/event/search`, {params}).subscribe(
      value => {
        this.emitSearchEvent(value);
      },
      error => {
        console.log(error);
      }
    );
  }

  searchEventsForHome(params: HttpParams): Observable<SearchResult> {
    return this.httpClient.get<SearchResult>(environment.apiUrl + `/event/search`, {params});
  }

  rate(rating: object): void {
    this.httpClient.post<any>(environment.apiUrl + `/rate`, rating).subscribe(
      () => {
        return null;
      },
      (error) => {
        console.log(error);

      }
    );
  }

  createEvent(value: object): Observable<Event>{
    return this.httpClient.post<Event>(environment.apiUrl + '/event/create', value);

  }

  sendImage(form): void {
    // console.log(eventImage.image);
    this.httpClient.post<any>(environment.apiUrl +  '/event/eventimagepost', form).subscribe(() => {
      return null;

      },
      (error) => {
        console.log(error);

      });
  }


  // getImage(eventId: number): Observable<any>{
  //  const parametres = new HttpParams().set('eventId', eventId.toString() );
  //  console.log('Dans GET IMAGE');
  //  return this.httpClient.get<any>(`http://localhost:8080/event/eventimageget`, {params: parametres});
  // }



  getImage(eventId: number): Observable<string>{
    const parametres = new HttpParams().set('eventId', eventId.toString() );
    console.log('Dans GET IMAGE');

    return this.httpClient.get<ArrayBuffer>(environment.apiUrl +  `/event/eventimageget`, {params: parametres, responseType: 'arraybuffer' as 'json'})
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

  searchListener(): Observable<SearchResult> {
    return this.searchEvent.asObservable();
  }

  emitSearchEvent(searchResult: SearchResult): void {
    this.searchEvent.next(searchResult);
  }

  getUserRating(id: number): Observable<number> {
    return this.httpClient.get<number>(environment.apiUrl +  `/rate/userRating/${id}`);

  }


  getUserEvents(): Observable<Event[]> {
    return this.httpClient.get<Event[]>(environment.apiUrl +  '/event/myevent');

  }

  isOwner(pageId: number): Observable<boolean> {
    return this.httpClient.get<boolean>(environment.apiUrl +  `/event/isOwner/${pageId}`);
  }


  patch(id: number, value: object): Observable<any>{
    return this.httpClient.patch(environment.apiUrl +  `/event/patch/${id}`, value);

  }

  ModifyImage(form: FormData): void {
    this.httpClient.patch<any>(environment.apiUrl +  '/event/eventimagemodify', form).subscribe(() => {
        return null;
      },
      (error) => {
        console.log(error);

      });
  }


  editAlternatifDescription(id: number, content: string): void {
    this.httpClient.patch<string>(environment.apiUrl +  `/event/patchalternatifdescription/${id}`, content).subscribe(
      value => {
        console.log(value);
      },
      error => {
        console.log(error);
      }
    );
  }


  getParticipations(): Observable<Participation[]> {
    return this.httpClient.get<Participation[]>(environment.apiUrl +  '/event/participations');
  }

  participate(eventId: number): void {
    this.httpClient.post<any>(environment.apiUrl +  `/event/participate/${eventId}`, '').subscribe(() => {
        return null;
      },
      (error) => {
        console.log(error);

      });
  }
  deleteEvent(pageId: number): void{
    console.log(pageId);
    this.httpClient.delete<any>(environment.apiUrl +  `/event/${pageId}`).subscribe();

  }
}
