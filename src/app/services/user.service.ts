import { Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {GlobalParameter} from '../specialClass/global-parameter';
import {Router} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../modeles/user';
import {CookieService} from 'ngx-cookie-service';
import {Organiser} from '../modeles/organiser';
import {UserComment} from '../modeles/user-comment';
import {environment} from '../../environments/environment';
import {UserCanCustomDescription} from '../modeles/user-can-custom-description';
import {map} from 'rxjs/operators';
import {UserCurrentRightDesc} from '../modeles/user-current-right-desc';


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
    this.httpClient.post<any>(environment.apiUrl +  '/login', value, {params: parametres}).subscribe(

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

  getOrganiserrProfil(): Observable<Organiser>{
    return this.httpClient.get<Organiser>( environment.apiUrl +  '/user/logedorganiser');
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

  patchOrganiser(value: object): void{
    this.httpClient.patch(environment.apiUrl +  '/user/patchOrganiser', value).subscribe(
      () => {
        console.log('oui');
      },
      (error) => {
        console.log(error);
      }
    );
  }

  isSessionValid(): void{
    this.httpClient.get<boolean>( environment.apiUrl +  '/user/sessionvalid').subscribe(
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
    this.httpClient.get<Authority>( environment.apiUrl + '/user/authority').subscribe(
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
    return this.httpClient.post<User>( environment.apiUrl +  '/user/patchpicture', uploadData);
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

  getUserComments(): Observable<UserComment[]>{
    return this.httpClient.get<UserComment[]>( environment.apiUrl + '/user/usercomments');
  }

  userCanAddPersonnalDescription(id: number): Observable<UserCanCustomDescription> {
    return this.httpClient.get<UserCanCustomDescription>(`http://localhost:8080/user/canaddpersonnaldescription/${id}`);
  }
  getOrganiserInfo(username: string): Observable<Organiser>{
    return this.httpClient.get<Organiser>(`http://localhost:8080/user/organiser/${username}`);
  }

  getOrganiserListInfo( search: HttpParams): Observable<Organiser[]>{
    console.log('pass');
    return this.httpClient.get<Organiser[]>('http://localhost:8080/user/organiserlist', {params: search});
  }

  getOrganiserPhoto(id: string): Observable<string>{
    const parametres = new HttpParams().set('username', id );
    return this.httpClient.get<ArrayBuffer>('http://localhost:8080/user/organiserPhoto', {params: parametres, responseType: 'arraybuffer' as 'json'})
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

  giveRightCustomeDescription(author: string, eventId: number): void {
    this.httpClient.post<string>(`http://localhost:8080/user/giveusercustomizationeventright/${author}/${eventId}`, '').subscribe(
      value => {

      }, error => {
        console.log(error);
      }
    );
  }

  getRightCustomeDescription(): Observable<UserCurrentRightDesc[]> {
    return this.httpClient.get<UserCurrentRightDesc[]>(`http://localhost:8080/user/usercustomizationeventright`);
  }


}


