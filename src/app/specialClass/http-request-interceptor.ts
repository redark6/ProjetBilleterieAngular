import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse
} from '@angular/common/http';

import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {HandleErrorsService} from './handle-errors.service';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(private error: HandleErrorsService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    request = request.clone({
      withCredentials: true
    });

    return next.handle(request)
      .pipe(
        retry(1),
        catchError((error: HttpErrorResponse) => {
          let errorMessage = '';
          if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${error.error.message}`;
          } else {
            // server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
            this.error.handleError(error);
          }

          return throwError(errorMessage);
        })
      );
  }


}


