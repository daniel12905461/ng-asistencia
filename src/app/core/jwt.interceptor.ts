import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from './authentication/token-storage.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private tokenStorageService: TokenStorageService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const token = this.tokenStorageService.getToken();

    let req = request;

    if (token) {
      req = request.clone({
        setHeaders: {
          authorization: `Bearer ${ token }`
        }
      });
    }
    return next.handle(req);
  }
}
