import { Injectable } from '@angular/core';
import {
 HttpInterceptor,
 HttpRequest,
 HttpHandler,
 HttpEvent
} from '@angular/common/http';
import { AuthService } from './services/auth.service';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) {}

 intercept(request: HttpRequest<any>, next: HttpHandler): any {
    const req = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${this.auth.getAccessToken()}`)
      });
    return next.handle(req);
 }
}
