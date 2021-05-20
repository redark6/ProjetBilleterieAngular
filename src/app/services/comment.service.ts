import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {EventComment} from '../modeles/eventComment';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private searchComment = new BehaviorSubject<EventComment[]>(null);
  constructor(private httpClient: HttpClient) {}

  public get(id: number, commentOrderBy: string): void {
    this.httpClient.get<EventComment[]>(`http://localhost:8080/comment/${id}`, {params: { orderBy: commentOrderBy}}).subscribe(

      value => {
        this.emitSearchComment(value);
      },
      error => {
        console.log(error);
      }
    );
  }

  public post(value: object): Observable<EventComment> {
    return this.httpClient.post<EventComment>(environment.apiUrl + `/comment`, value);
  }

  public likecomment(id: number, liketype: number): Observable<boolean>{
    return this.httpClient.put<boolean>(`http://localhost:8080/comment/${id}/like/${liketype}`, null);
  }

  searchCommentListener(): Observable<EventComment[]>{
    return this.searchComment.asObservable();
  }

  emitSearchComment(eventComment: EventComment[]): void{
    this.searchComment.next(eventComment);
  }

}



