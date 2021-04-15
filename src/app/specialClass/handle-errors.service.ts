import {Injectable, Output} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {GlobalParameter} from './global-parameter';
import {EventEmitter} from '@angular/core';
import {ToastrService} from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class HandleErrorsService {

  @Output() error403Event = new EventEmitter<object>();
  @Output() error409Event = new EventEmitter<object>();

  constructor(private globalVar: GlobalParameter, private toaster: ToastrService) {}

  public handleError(err: HttpErrorResponse): void {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      switch (err.status) {
        case 400:
          errorMessage = 'Bad Request.';
          break;
        case 401:
          errorMessage = 'You need to log in to do this action.';
          break;
        case 403:
          errorMessage = this.error403handling(err);
          break;
        case 404:
          errorMessage = 'The requested resource does not exist.';
          break;
        case 409:
          errorMessage = this.error409handling(err);
          break;
        case 412:
          errorMessage = 'Precondition Failed.';
          break;
        case 500:
          errorMessage = 'Internal Server Error.';
          break;
        case 503:
          errorMessage = 'The requested services is not available.';
          break;
        case 422:
          errorMessage = 'Validation Error!';
          break;
        default:
          errorMessage = 'Something went wrong!';
      }
    }
    if (errorMessage !== '') {
      this.toaster.error(errorMessage);
    }
  }

  private error403handling(err: HttpErrorResponse): string{
    switch (this.globalVar.currentRoute) {
      case '/login':
        if (!err.error) {
          this.emit403ErrorEvent('login', err);
          return '';
        }
        break;
    }
    return 'You don\'t have permission to access the requested resource.';
  }

  private error409handling(err: HttpErrorResponse): string{
    switch (this.globalVar.currentRoute) {
      case '/signup':
        this.emit409ErrorEvent('register', err);
        return '';
        break;
    }
    return 'Conflict with resources.';
  }

  emit403ErrorEvent(location: string, err: HttpErrorResponse): void{
    this.error403Event.emit(err.error);
  }

  emit409ErrorEvent(location: string, err: HttpErrorResponse): void{
    this.error409Event.emit(err.error);
  }

}
