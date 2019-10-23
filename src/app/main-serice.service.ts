import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders ,HttpErrorResponse } from "@angular/common/http";
import {Login} from "./login";
import {throwError } from "rxjs";
import {map,catchError } from "rxjs/operators";
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from "../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class MainSericeService {
  ServerUrl = environment.url;
  
  errorData: {};

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  role:any;
  isLoggedIn=false;
  userrole:string='';
  helper = new JwtHelperService();
  user_key:String;
  token:any;


  constructor(private http: HttpClient) { }
  ngOnInit() {
    this.token =localStorage.getItem('token');
    this.token = this.helper.decodeToken(this.token);   
    this.user_key=this.token['unique_key'];    
  
  }
  contactUs(formdata) {
    return this.http.post<any>(this.ServerUrl + 'contactUs', formdata, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  login(formdata:Login) {
    return this.http.post<any>(this.ServerUrl + 'login', formdata, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  logedIn(){
   return !!localStorage.getItem('token')
  }
  validateEmail(formdata:any) {
   return this.http.post<any>(this.ServerUrl + 'validateEmail', formdata, this.httpOptions).pipe(
    catchError(this.handleError)
  );
  }
  sendEmailToUser(formdata:any) {
    return this.http.post<any>(this.ServerUrl + 'sendEmailToUser', formdata, this.httpOptions).pipe(
     catchError(this.handleError)
   );
   }
   checkRole(formdata:any) {
    return this.http.post<any>(this.ServerUrl + 'getRole', formdata, this.httpOptions).pipe(
     catchError(this.handleError)
   );
   }
   addSubscriber(formdata:any) {
    return this.http.post<any>(this.ServerUrl + 'addSubscriber', formdata, this.httpOptions).pipe(
     catchError(this.handleError)
   );
   }

  getAuthorizationToken(){
   this.isLoggedIn=true;
   return localStorage.getItem('token');
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {

      // A client-side or network error occurred. Handle it accordingly.

      console.error('An error occurred:', error.error.message);
    } else {

      // The backend returned an unsuccessful response code.

      // The response body may contain clues as to what went wrong.

      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }

    // return an observable with a user-facing error message

    this.errorData = {
      errorTitle: 'Oops! Request for document failed',
      errorDesc: 'Something bad happened. Please try again later.'
    };
    return throwError(this.errorData);
  }
}
