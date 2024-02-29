import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private _cookieService: CookieService,
    private _router: Router,
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
     const authToken = this._cookieService.get('_token');

      if (authToken) {
        const authReq = request.clone({
          setHeaders: {
            Authorization: `Bearer ${authToken}`
          }
        });

        return next.handle(authReq).pipe(
          catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
              this._cookieService.deleteAll('/', '');
              this._router.navigate(['/login']); 
            }
            throw error;
          })
        );
      }
     return next.handle(request);
  }
}
