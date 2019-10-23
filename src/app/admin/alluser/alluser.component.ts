import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';

import { JwtHelperService } from '@auth0/angular-jwt';
import { DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-alluser',
  templateUrl: './alluser.component.html',
  styleUrls: ['./alluser.component.css']
})
export class AlluserComponent implements OnInit {

  helper = new JwtHelperService();   
  user_key: any;  
  token: string;
  allUser: any;
  intrestData= {'username':'','id':''};
  name:string="xyz";
  error: {};  
  btnText = 'Add'; 
  nameFilter: any = { username: '' };
  constructor(public router: Router, private as: AdminService , private ds:DomSanitizer) { 
  }
  ngOnInit() {
    this.token = localStorage.getItem('token');
    this.token = this.helper.decodeToken(this.token);
    this.user_key = this.token['unique_key']; 
    this.allintfun();
  }
  allintfun(){
    this.as.adminAllUser().subscribe(
      data => { this.allUser = data; },
      error => this.error = error
    );
  }
  view(key:String){
   this.router.navigate(['/admin/profile/'+key])
  }
  projects(key:String){
    this.router.navigate(['/admin/allproject/'+key])
   }
   followers(key:String){
    this.router.navigate(['/admin/follower/'+key])
   }
   
}
