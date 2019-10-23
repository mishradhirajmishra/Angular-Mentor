import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder,Validators } from '@angular/forms';
import { passwordValidator } from 'src/app/validators/password-validaor';
import {ManteeService  } from "../mantee.service";
import { RegisterMantee } from "../register-mantee";

@Component({
  selector: 'app-register-mantee',
  templateUrl: './register-mantee.component.html',
  styleUrls: ['./register-mantee.component.css']
})
export class RegisterManteeComponent implements OnInit,AfterViewInit {
// --------------------------------------
notsubmited = true;
userexist :String;
emailexist:String;
model = new RegisterMantee();
error: {};
captchaVal:string;

// -------------------------------------
get cap(){
  return this.registerMantee.get('captchaVal')
}
  get userName(){
    return this.registerMantee.get('username')
  }
  get email(){
    return this.registerMantee.get('email')
  }
  get password(){
    return this.registerMantee.get('password')
  }
  get cpassword(){
    return this.registerMantee.get('cpassword')
  }
  get skypeId(){
    return this.registerMantee.get('skype_id')
  }
  registerMantee = this.fb.group({
    username:['', Validators.required],
    skype_id:['', Validators.required],
    captchaVal:['', Validators.required],
    email: ['' , [Validators.required,Validators.email]],
    password: ['', [Validators.required,Validators.minLength(8)]],
    cpassword: ['',Validators.required],
    invitecode: [''],
    term:['',Validators.required],
   
  },{validator:passwordValidator});
  constructor(public router:Router ,private fb:FormBuilder,private rm:ManteeService) { }
  ngOnInit() {
    
   }
   ngAfterViewInit(){
   this.createCaptcha();
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
    return this.rm.addMantee(this.registerMantee.value).subscribe(
      data => this.model = data,
      error => this.error = error
    );
  }
  // =====================================================
 code:any;
 createCaptcha() {
  //clear the contents of captcha div first 
  document.getElementById('captcha').innerHTML = "";
  var charsArray =
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@!#$%^&*";
  var lengthOtp = 6;
  var captcha = [];
  for (var i = 0; i < lengthOtp; i++) {
    //below code will not allow Repetition of Characters
    var index = Math.floor(Math.random() * charsArray.length + 1); //get the next character from the array
    if (captcha.indexOf(charsArray[index]) == -1)
      captcha.push(charsArray[index]);
    else i--;
  }
  var canv = document.createElement("canvas");
  canv.id = "captcha";
  canv.width = 100;
  canv.height = 50;
  var ctx = canv.getContext("2d");
  ctx.font = "25px Georgia";
  ctx.strokeText(captcha.join(""), 0, 30);
  //storing captcha so that can validate you can save it somewhere else according to your specific requirements
  this.code = captcha.join("");
  document.getElementById("captcha").appendChild(canv); // adds the canvas to the body element
}
flag:boolean=false;
validateCaptcha() {
  var x=this.registerMantee.controls.captchaVal.value;
  if(x==this.code){this.flag=true}else{this.flag=false}

}
  // =====================================================
  
}
