import { Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GlobalParameter} from '../specialClass/global-parameter';
import {Router} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private authenticateEvent = new BehaviorSubject<boolean>(false);

  constructor(private httpClient: HttpClient, private router: Router, private globalVar: GlobalParameter) { }

  authenticate(value: object): void{

    this.httpClient.post<any>('http://localhost:8080/login', value).subscribe(
      () => {
        this.globalVar.isAuthenticate = true;
        this.emitAuthStatus(true);
        this.router.navigate(['home']);
      },
      (error) => {
        console.log(error);
      }
    );

  }

  logoutServer(): void{
    this.httpClient.post<any>('http://localhost:8080/logout', '').subscribe(
      () => {
        this.globalVar.isAuthenticate = false;
        this.emitAuthStatus(false);
        this.router.navigate(['home']);
      },
      (error) => {
        console.log(error);
      }
    );

  }

  login(value: object): void {
    this.authenticate(value);
  }

  logout(): void{
    this.logoutServer();
  }

  emitAuthStatus(state: boolean): void{
    this.authenticateEvent.next(state);
  }

  authListener(): Observable<any>{
    return this.authenticateEvent.asObservable();
  }

}


