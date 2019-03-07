import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

import { Observable } from 'rxjs';
import { TokenService } from 'src/services/token.service';

@Injectable() export class HttpConfigInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any> > {
    const token = this.tokenService.getToken();
    const validatedRequest = request.clone({ setHeaders: { Authorization: 'Bearer ' + token }} );
    return next.handle(validatedRequest);
  }
}
