import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ManteeService } from '../mantee.service';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DomSanitizer} from '@angular/platform-browser';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

 
  helper = new JwtHelperService();   
  user_key: any;  
  token: string;

  error: {};   

  allNotification:any;
  profileLength:number;

  constructor(public router: Router, private ms: ManteeService, private ds:DomSanitizer) { 
  }
  ngOnInit() {
    this.token = localStorage.getItem('token');
    this.token = this.helper.decodeToken(this.token);
    this.user_key = this.token['unique_key']; 
    this.ms.allNotification({'admin_key':this.user_key}).subscribe(
      data => { this.allNotification = data;  this.profileLength =this.allNotification.length; },
      error => this.error = error
    );
  }


  followMsg:string;
 follow(key: any) {
 
   return this.ms.addFollow({ 'admin_key': key, 'user_key': this.user_key }).subscribe(
     data =>{ this.followMsg = data; this.ngOnInit();},
     error => this.error = error
   );

  }

  go(link:any){
    this.router.navigate([link]);
  }

  delete(id:number){
    var  delmsg="";
   return this.ms.deleteNotification({ 'id': id }).subscribe(
    data =>{ delmsg = data; this.ngOnInit();},
    error => this.error = error
  );
  }
}
