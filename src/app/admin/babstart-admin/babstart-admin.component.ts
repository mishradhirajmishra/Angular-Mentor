import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-babstart-admin',
  templateUrl: './babstart-admin.component.html',
  styleUrls: ['./babstart-admin.component.css']
})
export class BabstartAdminComponent implements OnInit {

  helper = new JwtHelperService();   
  user_key: any;  
  token: string;
  allUser: any;
  intrestData= {'username':'','id':''};
  name:string="xyz";
  error: {};  
  btnText = 'Add'; 
  nameFilter: any = { name: '' };
  constructor(public router: Router, private as: AdminService , private ds:DomSanitizer) { 
  }
  ngOnInit() {
    this.token = localStorage.getItem('token');
    this.token = this.helper.decodeToken(this.token);
    this.user_key = this.token['unique_key']; 
    this.allintfun();
  }
  allintfun(){
    this.as.allContact().subscribe(
      data => { this.allUser = data; console.log(this.allUser) },
      error => this.error = error
    );
  }


}
