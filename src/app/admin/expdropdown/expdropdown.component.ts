import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-expdropdown',
  templateUrl: './expdropdown.component.html',
  styleUrls: ['./expdropdown.component.css']
})
export class ExpdropdownComponent implements OnInit {

  helper = new JwtHelperService();   
  user_key: any;  
  token: string;
  allIntrest: any;
  intrestData= {'name':'','id':''};
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
    this.as.adminAllExpDropDown().subscribe(
      data => { this.allIntrest = data; },
      error => this.error = error
    );
  }
  msg:string;
  submit(){
    this.as.adminAddExpDropDown(this.intrestData).subscribe(
      data => { this.msg = data;this.intrestData.name='';this.intrestData.id='';    this.allintfun(); },
      error => this.error = error
    );

  }
  edit(intrest:any){
    this.btnText='Update';
    this.intrestData.id=intrest.id;    this.intrestData.name=intrest.name;
  }
  enable:boolean=true;
  nameData(){
    if(this.intrestData.name){
      this.enable=false;
    }
    else{
      this.enable=true;
    }
  }
  reset(){
    this.btnText='Add';
    this.intrestData.name=''; this.intrestData.id='';
  }

}
