import {Injectable} from '@angular/core';
import {Region} from '../modeles/region';

@Injectable()
export class GlobalParameter {
  isAuthenticate = false;
  currentRoute = 'home';
  userAuthority = '';
  regionList: Region[];
}
