import {Inject, Injectable} from '@angular/core';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import {isNullOrUndefined} from 'util';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService) { }

  isLoggedIn() {
    return !isNullOrUndefined(this.storage.get('token'));
  }

  setToken(token: string) {
    this.storage.set('token', token);
  }

  logout() {
    this.storage.remove('token');
  }
}
