import { Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {GlobalParameter} from '../specialClass/global-parameter';
import {Router} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../modeles/user';
import {CookieService} from 'ngx-cookie-service';

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
    const parametres = new HttpParams().set('remember-me', 'true' );
    this.httpClient.post<any>('http://localhost:8080/login', value, {params: parametres}).subscribe(
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

  isSessionValid(): void{
    this.httpClient.get<boolean>('http://localhost:8080/user/sessionvalid').subscribe(
      (value) => {
        console.log(value);
        this.globalVar.isAuthenticate = value;
        this.emitAuthStatus(value);
      },
      (error) => {
        this.globalVar.isAuthenticate = false;
        this.emitAuthStatus(false);
      }
    );

  }

  getAuthority(): void{
    this.httpClient.get<Authority>('http://localhost:8080/user/authority').subscribe(
      (authority) => {
        if (authority[0] !== undefined ){
          this.globalVar.userAuthority = authority[0].authority;
        }else{
          this.globalVar.userAuthority = '';
        }
        console.log(this.globalVar.userAuthority);
        this.emitRoleStatus(this.globalVar.userAuthority);
      },
      (error) => {

      }
    );
  }

  patchProfilPicture(picture): Observable<User> {
    const uploadData = new FormData();
    uploadData.append('myFile', picture, picture.name);
    return this.httpClient.post<User>('http://localhost:8080/user/patchpicture', uploadData);
  }


  emitAuthStatus(state: boolean): void{
    this.authenticateEvent.next(state);
  }

  authListener(): Observable<any>{
    return this.authenticateEvent.asObservable();
  }

  emitRoleStatus(auth: string): void{
    this.authorityStatus.next(auth);
  }

  roleListener(): Observable<any>{
    return this.authorityStatus.asObservable();
  }



  upgradeOrganiser(value: object): void{
    this.httpClient.post<any>('http://localhost:8080/user/upgradeToOrganiser', value).subscribe(
      () => {
        this.getAuthority();
        return this.router.navigate(['profil']);
      },
      (error) => {
        console.log(error);
      }
    );
  }


}


