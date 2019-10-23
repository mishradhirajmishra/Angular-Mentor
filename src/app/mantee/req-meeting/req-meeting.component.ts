import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ManteeService } from '../mantee.service';
import { FormBuilder, Validators, NgForm } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-req-meeting',
  templateUrl: './req-meeting.component.html',
  styleUrls: ['./req-meeting.component.css']
})
export class ReqMeetingComponent implements OnInit {
  theCheckbox:boolean;
  msg:any;
  allMeeting:any;
  profileImage:any;
  profileName:any;
  proid:any;
  myProject:any;
  otherProject:any;
  helper = new JwtHelperService();
  lengthMsg: string;
  error: {};
  cat=[];
  user_key: any;
  model: any;
  imgfile: {};
  allIntrest: any;
  token: string;
  submited: boolean = false;
  constructor(public router: Router, private fb: FormBuilder, private ms: ManteeService, private actroute: ActivatedRoute,) {  }
  get videoUrl() {return this.userPost.get('video'); }
  get description() {return this.userPost.get('description'); }
  userPost = this.fb.group({
    meeting_comment: [''],
    check: [''],
    project_key: [''],
    id: [''] ,  
    mode: [''] , 
  });
  ngOnInit() {
    this.token = localStorage.getItem('token');
    this.token = this.helper.decodeToken(this.token);
    this.user_key = this.token['unique_key'];
    this.actroute.paramMap.subscribe(params => {
      this.proid=params.get('id');
     }) 
     this.myproject();
     this.othProject();
     this.profileimage();
     this.profilename();  
     this.allmeeting();
  }
  allmeeting(){
    this.ms.allMeetingOfAdmin({'admin_key':this.proid}).subscribe(
      data => {this.allMeeting = data;},
      error => this.error = error
    );
  }
  profilename(){
 
    this.ms.getProfile({'user_key':this.proid}).subscribe(
      data => {this.profileName = data.name;},
      error => this.error = error
    );  
  }
  profileimage(){
    this.ms.profileImage({'user_key':this.proid}).subscribe(
      data => {this.profileImage = data;},
      error => this.error = error
    ); 
  }
  myproject(){
    this.ms.menteeProjDropdown({'user_key':this.user_key}).subscribe(
      data => {this.myProject = data;},
      error => this.error = error
    );   
  }
  othProject(){
    this.ms.menteeProjDropdown({'user_key':this.proid}).subscribe(
      data => {this.otherProject = data;},
      error => this.error = error
    );   
  }
  viewprofile(){
    this.router.navigate(['mentee/profile/'+this.proid]);
  }
  requestMeeting(){
  return  this.ms.updateMeeting({'user_key':this.user_key,'data':this.userPost.value}).subscribe(
      data => {this.msg = data;this.submited=true; this.ngOnInit();},
      error => this.error = error
    );  
   
  }
}
