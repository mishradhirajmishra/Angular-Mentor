import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder,Validators } from '@angular/forms';
import { passwordValidator } from 'src/app/validators/password-validaor';
import {ManteeService  } from "../mantee.service";
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
// --------------------------------------
helper = new JwtHelperService();
unique_key:string;
ktokenkey:{};
notsubmited = true;
userexist :String;
emailexist:String;
dataArray:{};
msg:string;
my_code:string;
error: {};

// -------------------------------------
  get userName(){
    return this.updateAccount.get('username')
  }
  get email(){
    return this.updateAccount.get('email')
  }
  get password(){
    return this.updateAccount.get('password')
  }
  get cpassword(){
    return this.updateAccount.get('cpassword')
  }
  updateAccount = this.fb.group({
    skype_id:['', Validators.required],
     username:['', Validators.required],
    email: ['' , [Validators.required,Validators.email]],
    password: ['', [Validators.required,Validators.minLength(8)]],
    cpassword: ['',Validators.required],
  },{validator:passwordValidator});
  constructor(public router:Router ,private fb:FormBuilder,private rm:ManteeService) { }
  ngOnInit() {
    var token = localStorage.getItem('token');
    this.ktokenkey = this.helper.decodeToken(token);  
    this.unique_key =this.ktokenkey['unique_key'];
  
    this.rm.accountByKey({"unique_key": this.unique_key }).subscribe(
      data => {this.updateAccount.patchValue(data);this.my_code=data.my_code},
      error => this.error = error
    );
   }

  home(){
    this.router.navigate(['/']);
  }
  login(){
    this.router.navigate(['/login']);
   }
   manteeReg(){
    this.notsubmited = true;
   }
   
   gotoPitchit(){
    this.router.navigate(['mentee/intrestarea'])
  }
  ifManteeExist(){
    return this.rm.ifManteeExist({"username":this.userName.value}).subscribe(
      data => this.userexist = data,
      error => this.error = error
    );
  }
  ifManteeEmailExist(){
    return this.rm.ifManteeEmailExist({"email":this.email.value}).subscribe(
      data => this.emailexist = data,
      error => this.error = error
    );
  }
  register(){
    this.notsubmited = false;
     this.dataArray={"unique_key": this.unique_key,'data':this.updateAccount.value}   
     return this.rm.updateAccount( this.dataArray).subscribe(
      data => this.msg=data,
      error => this.error = error
    );
  }
}
