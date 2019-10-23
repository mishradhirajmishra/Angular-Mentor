import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DomSanitizer} from '@angular/platform-browser';
@Component({
  selector: 'app-admin-sub-helparea',
  templateUrl: './admin-sub-helparea.component.html',
  styleUrls: ['./admin-sub-helparea.component.css']
})
export class AdminSubHelpareaComponent implements OnInit {


  helper = new JwtHelperService();   
  user_key: any;  
  token: string;
  allIntrest: any;
  intrestData= {'name':'','id':'','help_key':''};
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
    this.allHelp();
  }
  allintfun(){
    this.as.adminAllSubHelpArea().subscribe(
      data => { this.allIntrest = data; },
      error => this.error = error
    );
  }
  allHelpVar:any;
  allHelp(){
    this.as.adminAllHelpArea().subscribe(
      data => { this.allHelpVar = data; },
      error => this.error = error
    );
  }
  msg:string;
  submit(){
  
    this.as.adminAddSubHelpArea(this.intrestData).subscribe(
      data => { this.msg = data; this.intrestData.name='';this.intrestData.id='';    this.allintfun(); },
      error => this.error = error
    );

  }
  edit(intrest:any){
    this.btnText='Update';
    this.intrestData.id=intrest.id;    this.intrestData.name=intrest.name;this.intrestData.help_key=intrest.help_key;
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
