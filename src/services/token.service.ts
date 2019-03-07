import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private token: string;

  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService) {
    this.token = this.storage.get('token');
  }

  isLoggedIn(): boolean {
    return !isNullOrUndefined(this.storage.get('token'));
  }

  getToken() {
    return this.token;
  }

  setToken(token: string) {
    this.storage.set('token', token);
    this.token = token;
  }

  logout() {
    this.storage.remove('token');
    this.token = null;
  }
}
