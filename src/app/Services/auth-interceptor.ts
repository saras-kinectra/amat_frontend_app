import { AuthorizationService } from './../authorization.service';
import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest, HttpEvent } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import {mergeMap} from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    public token:string;
    constructor (private authService : AuthorizationService) {}
    
    intercept (request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return this.authService.tokenResponse()
        .pipe(mergeMap(token => {
            if (token) {
                // clone and modify the request
                request = request.clone({
                    setHeaders: {
                        Authorization: `Bearer ${token.accessToken}`
                    }
                });
            }
            return next.handle(request);    
        })
        );       
}
}