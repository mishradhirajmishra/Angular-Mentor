import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { ManteeService } from '../../mantee.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { $ } from 'protractor';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  helper = new JwtHelperService();
  user_key: String;
  token: any;
  model:any;
 allMeeting:any;
  error: {};
  msg:string = "";
  skypeInstaled: boolean;
  updateReject = this.fb.group({
    id:[''],
    reject_comment:[''],
  });

  constructor(public router: Router, private fb: FormBuilder, private ms: ManteeService,private ds:DomSanitizer) { }

  ngOnInit() {
    this.token = localStorage.getItem('token');
    this.token = this.helper.decodeToken(this.token);
    this.user_key = this.token['unique_key'];
    this.ms.manageMeeting({'user_key':this.user_key}).subscribe(
      data => {this.allMeeting = data;},
      error => this.error = error
    );
    this.skypeCheck();
  }
  profile(id:any){
    this.router.navigate(['mentee/profile/'+id]);

  } 

  getid(id:any){
   return "#myModel"+id;
  } 
  cancelRequest(id:any){
    this.router.navigate(['mentee/profile/'+id]);
 
  } 
  acceptMeetingByAdmin(id:any){

  return  this.ms.acceptMeetingByAdmin({'id':id}).subscribe(
      data => {this.msg = data; this.ngOnInit();},
      error => this.error = error
    ); 
  } 
  reject(id:number,comment:string){
    this.msg="";
    this.updateReject.patchValue({"id":id,"reject_comment":comment});
  
  }
  onSubmit(){
  
    return this.ms.rejectMeetingByAdmin( {'data':this.updateReject.value}).subscribe(
     data => {this.msg = data;},
     error => this.error = error     
   );
  }
  chaturl(url:string){
    return this.ds.bypassSecurityTrustUrl(url);
  }
  skypeCheck() {
    if (typeof (navigator.mimeTypes["application/x-skype"]) == "object") {
      this.skypeInstaled = true;
    }
    else {
      this.skypeInstaled = false;
    }
  }
}
