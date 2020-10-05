import { Injectable } from '@angular/core';
import * as Cookies from 'js-cookie'

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private token: string;

  constructor() {
    this.token = Cookies.get('session');
  }

  isLoggedIn(): boolean {
    if(this.token) return true;
    return false;
  }

  getToken() {
    return this.token;
  }

  setToken(token: string) {
    Cookies.set('session', token);
    this.token = token;
  }

  logout() {
    Cookies.remove('session');
    this.token = null;
  }
}
