import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {EventComment} from '../modeles/eventComment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private searchComment = new BehaviorSubject<EventComment[]>(null);
  constructor(private httpClient: HttpClient) {}

  public get(id: number): void {
    this.httpClient.get<EventComment[]>(`http://localhost:8080/comment/${id}`).subscribe(
      value => {
        this.emitSearchComment(value);
      },
      error => {
        console.log(error);
      }
    );
  }

  public post(value: object): Observable<EventComment> {
    return this.httpClient.post<EventComment>(`http://localhost:8080/comment`, value);
  }

  searchCommentListener(): Observable<EventComment[]>{
    return this.searchComment.asObservable();
  }

  emitSearchComment(eventComment: EventComment[]): void{
    this.searchComment.next(eventComment);
  }

}



