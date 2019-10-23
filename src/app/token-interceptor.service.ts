
import { Injectable } from '@angular/core';
import {  HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()

export class TokenInterceptorService implements HttpInterceptor {

    constructor() {}
    authToken = localStorage.getItem('token');
    intercept(req, next) {
     let   tokenreq = req.clone({
            setHeaders:
                 { Authorization: `Bearer ${this.authToken}` }
             }
         );
        return next.handle(tokenreq);
    }
}
