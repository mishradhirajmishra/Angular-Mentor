import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AdminService } from "../admin.service";
@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent implements OnInit {
  helper = new JwtHelperService();
  token:any;
  error:{};
  user_key:any;
  width:number;
  showsidebar:boolean;
  mobileview:boolean;
  constructor(public  router: Router,private as:AdminService) { }

  ngOnInit() {
    this.token =localStorage.getItem('token');
    this.token = this.helper.decodeToken(this.token);  
    if(this.token){ 
    this.user_key=this.token['unique_key'];
    }
    this.chkScreenSize();
  }
  chkScreenSize(){
    this.width = window.innerWidth;
    if (this.width <= 991) {
      this.showsidebar=false;
      this.mobileview=true;

    } else {
      this.showsidebar=true;
      this.mobileview=false;
    } 
  }
  logoutvar:any;
  logoutServer(){
    return this.as.logout({'user_key':this.user_key}).subscribe(
      data => {this.logoutvar = data; },
      error => this.error = error
    );  
  }
  dashboard(){
    if(this.mobileview){this.showsidebar=false}
    this.router.navigate(['admin/dasboard'])
  }
  analytics(){
    if(this.mobileview){this.showsidebar=false}
    this.router.navigate(['admin/analytics'])
  }
  intrestArea(){
    if(this.mobileview){this.showsidebar=false}
    this.router.navigate(['admin/intrestarea'])
  }
  startupArea(){
    if(this.mobileview){this.showsidebar=false}
    this.router.navigate(['admin/startuparea'])
  }
  education(){
    if(this.mobileview){this.showsidebar=false}
    this.router.navigate(['admin/education'])
  }
  experiance(){
    if(this.mobileview){this.showsidebar=false}
    this.router.navigate(['admin/experience'])
  }
  alluser(){
    if(this.mobileview){this.showsidebar=false}
    this.router.navigate(['admin/alluser'])
  }
  allproj(){
    if(this.mobileview){this.showsidebar=false}
    this.router.navigate(['admin/allproject'])
  }
  focus(){
    if(this.mobileview){this.showsidebar=false}
    this.router.navigate(['admin/project-focus'])
  }
  account(){
    if(this.mobileview){this.showsidebar=false}
    this.router.navigate(['admin/account'])
  }
  helpArea(){
    if(this.mobileview){this.showsidebar=false}
    this.router.navigate(['admin/helparea'])
  }
 subhelpArea(){
  if(this.mobileview){this.showsidebar=false}
    this.router.navigate(['admin/subhelparea'])
  }
  meetings(){
    if(this.mobileview){this.showsidebar=false}
    this.router.navigate(['admin/meeting'])
  }
  posts(){
    if(this.mobileview){this.showsidebar=false}
    this.router.navigate(['admin/posts'])
  }
  subscriber(){
    if(this.mobileview){this.showsidebar=false}
    this.router.navigate(['admin/subscriber'])
  }
  babastart(){
    if(this.mobileview){this.showsidebar=false}
    this.router.navigate(['admin/contact'])
  }
  
  logout() {
    this.logoutServer();
    window.localStorage.clear();
    location.reload()
  }
  sidebar(){
    if(this.showsidebar==true)
   {this.showsidebar=false;}else{this.showsidebar=true;}
  }
}
