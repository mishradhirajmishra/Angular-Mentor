import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { JwtHelperService } from '@auth0/angular-jwt';
import { NgForm } from "@angular/forms";
import { ManteeService } from 'src/app/mantee/mantee.service';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {
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
    return this.ms.allHelpArea({'user_key':this.user_key}).subscribe(
      data => {this.allintrest = data ; },
      error => this.error = error
    );
   }
   intrest = this.allintrest;
   onSubmit(data:NgForm){
  
       return this.ms.updateManteeHelpArea({'user_key':this.user_key,'data':data.value}).subscribe(
        data => {this.model = data;this.submited = true; },
        error => this.error = error
      ); 

   }
   getColor(col:string){
   return "background-color:"+col;
   }

}
