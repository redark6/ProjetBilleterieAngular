import { Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GlobalParameter} from '../specialClass/global-parameter';
import {Router} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../webPages/profil/user';
import {CookieService} from 'ngx-cookie-service';

interface ReturnedErrors{
  errors: object;
}

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private authenticateEvent = new BehaviorSubject<boolean>(false);

  constructor(private httpClient: HttpClient, private router: Router, private globalVar: GlobalParameter, private cookie: CookieService) { }

  login(value: object): void{
    this.httpClient.post<any>('http://localhost:8080/login', value).subscribe(
      () => {
        this.globalVar.isAuthenticate = true;
        this.emitAuthStatus(true);
        return this.router.navigate(['home']);
      },
      (error) => {
        console.log(error);
      }
    );

  }

  logout(): void{
    this.httpClient.post<any>('http://localhost:8080/logout', '').subscribe(
      () => {
        this.globalVar.isAuthenticate = false;
        this.emitAuthStatus(false);
        return this.router.navigate(['home']);
      },
      (error) => {
        console.log(error);
      }
    );

  }

  register(value: object): void{
    this.httpClient.post<any>('http://localhost:8080/user/create', value).subscribe(
      () => {
        return this.router.navigate(['home']);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getUserProfil(): Observable<User>{
    return this.httpClient.get<User>('http://localhost:8080/user/logeduser');
  }

 patch(value: object): void{
    this.httpClient.patch('http://localhost:8080/user/patch', value).subscribe(
      () => {
        console.log('oui');
      },
      (error) => {
        console.log(error);
      }
    );
 }

  emitAuthStatus(state: boolean): void{
    this.authenticateEvent.next(state);
  }

  authListener(): Observable<any>{
    return this.authenticateEvent.asObservable();
  }

  // checkIfUserIsAuth(): void{
      // if (this.cookie.get('JSESSIONID')) {
        // if(){

        // }

      // }
      // this.cookie.set( 'Test', 'Hello World' );
      // this.cookieValue = this.cookieService.get('Test');
    // }

}


