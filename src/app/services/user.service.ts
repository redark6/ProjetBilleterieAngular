import { Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GlobalParameter} from '../specialClass/global-parameter';
import {Router} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../modeles/user';
import {CookieService} from 'ngx-cookie-service';
import {environment} from '../../environments/environment';

interface ReturnedErrors{
  errors: object;
}

interface Authority{
  authority: string;
}

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private authenticateEvent = new BehaviorSubject<boolean>(false);
  private authorityStatus = new BehaviorSubject<string>('');

  constructor(private httpClient: HttpClient, private router: Router, private globalVar: GlobalParameter, private cookie: CookieService) { }

  login(value: object): void{
    this.httpClient.post<any>( environment.apiUrl + '/login', value).subscribe(
      () => {
        this.globalVar.isAuthenticate = true;
        this.emitAuthStatus(true);
        console.log('pass here', this.globalVar.isAuthenticate);
        this.getAuthority();
        this.router.navigate(['home']);
      },
      (error) => {
        console.log(error);
      }
    );

  }

  logout(): void{
    this.httpClient.post<any>( environment.apiUrl + '/logout', '').subscribe(
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
    this.httpClient.post<any>( environment.apiUrl + '/user/create', value).subscribe(
      () => {
        return this.router.navigate(['home']);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getUserProfil(): Observable<User>{
    return this.httpClient.get<User>( environment.apiUrl + '/user/logeduser');
  }

 patch(value: object): void{
    this.httpClient.patch( environment.apiUrl + '/user/patch', value).subscribe(
      () => {
        console.log('oui');
      },
      (error) => {
        console.log(error);
      }
    );
 }

  isSessionValid(): void{
    this.httpClient.get( environment.apiUrl + '/user/sessionvalid').subscribe(
      () => {
        this.globalVar.isAuthenticate = true;
        this.emitAuthStatus(true);
      },
      (error) => {
        this.globalVar.isAuthenticate = false;
        this.emitAuthStatus(false);
      }
    );

  }

  getAuthority(): void{
    this.httpClient.get<Authority>( environment.apiUrl + '/user/authority').subscribe(
      (authority) => {
        this.globalVar.userAuthority = authority[0].authority;
        console.log('authority: ' + authority[0].authority);
        this.emitRoleStatus(this.globalVar.userAuthority);
      },
      (error) => {

      }
    );
  }


  emitAuthStatus(state: boolean): void{
    this.authenticateEvent.next(state);
  }

  emitRoleStatus(auth: string): void{
    this.authorityStatus.next(auth);
  }

  authListener(): Observable<any>{
    return this.authenticateEvent.asObservable();
  }


  upgradeOrganiser(value: object): void{

    this.httpClient.post<any>( environment.apiUrl + '/user/upgradeToOrganiser', value).subscribe(
      () => {
        this.getAuthority();
        return this.router.navigate(['profil']);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  roleListener(): Observable<any>{
    return this.authorityStatus.asObservable();
  }

}


