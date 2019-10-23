import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loggedIn:boolean=false;
  helper = new JwtHelperService();
  token:any;
  constructor( private router:Router) { }

  ngOnInit() {
    this.token = localStorage.getItem('token');
    if( this.token){
    this.token = this.helper.decodeToken(this.token);
    this.loggedIn = this.token['remember'];
    }
  }
  logout() {
    window.localStorage.clear();
    location.reload()
  }
  dashboard(){
    this.router.navigate(['mentee/dasboard']);
  }
  home(){
     location.replace('/');
  }
}
