import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-subscribser',
  templateUrl: './subscribser.component.html',
  styleUrls: ['./subscribser.component.css']
})
export class SubscribserComponent implements OnInit {


  helper = new JwtHelperService();   
  user_key: any;  
  token: string;
  allUser: any;
  error: {};  
  btnText = 'Add'; 
  nameFilter: any = { email: '' };
  constructor(public router: Router, private as: AdminService ) { 
  }
  ngOnInit() {
    this.token = localStorage.getItem('token');
    this.token = this.helper.decodeToken(this.token);
    this.user_key = this.token['unique_key']; 
    this.allintfun();
  }
  allintfun(){
    this.as.allSubscriber().subscribe(
      data => { this.allUser = data; },
      error => this.error = error
    );
  }

}
