import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder,Validators,FormArray } from '@angular/forms';
import { ManteeService } from '../mantee.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  helper = new JwtHelperService();
  user_key:String;
  notsubmited = true;
  model:any;
  token:string;
  profileData:any;
  manteeProfileExplist:any;
  manteeProfileEdulist:any;
  formhide=true;
  profileImage:any;
error: {};
get  getMoreExp(){
  return this.userProfile.get('moreExp') as FormArray;
}
get  getMoreEdu(){
  return this.userProfile.get('moreEdu') as FormArray;
}

addMoreExp(){
  this.getMoreExp.push(this.fb.group({
    company:'',
    possition:'',
    other:'1',
    dateFrom:'',
    dateTo:'',
    currentlyWorking:''
    }));
}
addMoreEdu(){
  this.getMoreEdu.push(this.fb.group({
    insitute:'',
    eofComplete:'',
    level:'1',
    dateFrom:'',
    dateTo:'',
    currentlyWorking:''
    }));
}
userProfile= this.fb.group({
  name:['', Validators.required],
  age: ['' , Validators.required],
  sex: ['', Validators.required],
  bio: ['',Validators.required],
  moreExp:this.fb.array([]),
  moreEdu:this.fb.array([])

});
constructor(public router:Router ,private fb:FormBuilder,private ms:ManteeService) { }

  ngOnInit() {
    this.token =localStorage.getItem('token');
    this.token = this.helper.decodeToken(this.token);   
    this.user_key=this.token['unique_key'];    
    this.ms.getProfile({'user_key':this.user_key}).subscribe(
      data => this.profileData = data,
      error => this.error = error
    );  
    this.ms.manteeProfileEdulist().subscribe(
      data => this.manteeProfileEdulist = data,
      error => this.error = error
    ); 
    this.ms.manteeProfileExplist().subscribe(
      data => this.manteeProfileExplist = data,
      error => this.error = error
    ); 
    this.ms.profileImage({'user_key':this.user_key}).subscribe(
      data => {this.profileImage = data;},
      error => this.error = error
    ); 
     this.allfollow();
  }
  allfollowMsg:number;
  allfollow() {
   return this.ms.allFollowCount({ 'admin_key': this.user_key}).subscribe(
     data => this.allfollowMsg = data,
     error => this.error = error
   );
  }
  updateProfile(){
    this.notsubmited = false;
    return this.ms.updateProfile({'user_key':this.user_key,'data':this.userProfile.value}).subscribe(
      data => {this.model = data;location.reload(); },
      error => this.error = error
    );  
      
  }
  editprofile() {  
    this.formhide=false;
    var i;
    for (i = 0; i < this.profileData.moreExp.length; i++) {
      this.addMoreExp();
    }
    for (i = 0; i < this.profileData.moreEdu.length; i++) {
      this.addMoreEdu();
    }
    this.userProfile.patchValue(this.profileData);
  }
  publicProfile(){
    this.router.navigate(['/mentee/profile/'+this.user_key])
  }
}
