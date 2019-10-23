import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MainSericeService } from "../main-serice.service";

@Injectable({
  providedIn: 'root'
})
export class ManteeAuthGuard implements CanActivate, CanActivateChild {
  helper = new JwtHelperService();
  role: {};
  remember: any;
  token: any;
  localStorage:any;
  constructor(public ms: MainSericeService) {  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.localStorage=localStorage.getItem('token');
      this.token = this.helper.decodeToken(this.localStorage);
      if(this.token){
      if (this.token['remember'] == false) {
        if (sessionStorage.getItem('login')) {
          this.role = this.token['usertype'];
        } 
      }else{
        this.role = this.token['usertype'];
      }
    }
    if (this.role == 'mentee' || this.role == 'mentor' || this.role == 'admin') { return true; } else { return false; }
  } 

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.localStorage=localStorage.getItem('token');
      this.token = this.helper.decodeToken(this.localStorage);
      if(this.token){
      if (this.token['remember'] == false) {
        if (sessionStorage.getItem('login')) {
          this.role = this.token['usertype'];
        }
      }else{
        this.role = this.token['usertype'];
      }
    }
    if (this.role == 'mentee'|| this.role == 'mentor' || this.role == 'admin') { return true; } else { return false; }
  }

}
