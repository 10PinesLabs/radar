import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { SessionService } from "./session.service";

@Injectable({
  providedIn: 'root'
})

export class HtttpSessionService implements SessionService {

  constructor () { }
  
  isLoggedIn(): boolean {
    const token = localStorage.getItem('token')
    if(token) return true;
    return false;
  }

}