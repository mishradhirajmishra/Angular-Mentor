import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ManteeService  } from "../mantee.service";
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-intrest-area',
  templateUrl: './intrest-area.component.html',
  styleUrls: ['./intrest-area.component.css']
})
export class IntrestAreaComponent implements OnInit {
  helper = new JwtHelperService();
  user_key:String;
  token:string;
  model:any;
  test=true;
submited = false;
allintrest:any;
error: {};
intrestData:{};
  constructor(public router:Router ,private ms:ManteeService) { }
  ngOnInit() {
    this.token =localStorage.getItem('token');
    this.token = this.helper.decodeToken(this.token);   
    this.user_key=this.token['unique_key'];  
    return this.ms.allIntrest({'user_key':this.user_key}).subscribe(
      data => {this.allintrest = data ; },
      error => this.error = error
    );
   }
   intrest = this.allintrest;
   onSubmit(data:NgForm){
  
       return this.ms.updateManteeIntrestArea({'user_key':this.user_key,'data':data.value}).subscribe(
        data => {this.model = data;this.submited = true; },
        error => this.error = error
      ); 

   }


}
