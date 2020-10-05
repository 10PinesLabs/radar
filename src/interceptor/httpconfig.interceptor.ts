import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TokenService } from 'src/services/token.service';
import { Router } from '@angular/router';

@Injectable() export class HttpConfigInterceptor implements HttpInterceptor {

  HTTP_STATUS_UNAUTHORIZED = 401;

  constructor(private tokenService: TokenService, private router: Router, ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any> > {
    const token = this.tokenService.getToken();
    const validatedRequest = request.clone({ setHeaders: { Authorization: 'Bearer ' + token }} );
    return next.handle(validatedRequest).pipe(tap(event => {}, error => {
      if (error.status === this.HTTP_STATUS_UNAUTHORIZED) {
        this.router.navigate(['/error']);
      }
    }));
  }
}
