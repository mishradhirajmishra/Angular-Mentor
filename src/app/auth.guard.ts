import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { MainSericeService } from './main-serice.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private ms:MainSericeService,private router:Router){}
  canActivate( ): boolean{
    if(this.ms.logedIn()){
    return true;
  }else{
    this.router.navigate(['/login']);
    return false;
  }
  }
  
}
