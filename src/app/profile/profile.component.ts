import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder,Validators,FormArray } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ManteeService } from '../mantee/mantee.service';

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
     this. getRole();
  }
  role:string;
  getRole(){
    this.ms.checkRole({'user_key':this.user_key}).subscribe(
      data => {this.role = data; console.log(this.role) },
      error => this.error = error
    );  
  }
  updateProfile(){
    this.notsubmited = false;
    return this.ms.updateProfile({'user_key':this.user_key,'data':this.userProfile.value}).subscribe(
      data => {this.model = data; 
        if(this.role=='mentee'){this.router.navigate(['pitchit']); }
        else{this.router.navigate(['mentor/helpArea']); }
        
      },
      error => this.error = error
    );  
      
  }
}
