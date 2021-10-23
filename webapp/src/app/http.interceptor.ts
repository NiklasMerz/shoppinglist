import { Injectable } from '@angular/core';
import {
 HttpInterceptor,
 HttpRequest,
 HttpHandler,
 HttpEvent
} from '@angular/common/http';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {
 intercept(request: HttpRequest<any>, next: HttpHandler): any {
    const req = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${localStorage.getItem('access_token')}`)
      });
    return next.handle(req);
 }
}
