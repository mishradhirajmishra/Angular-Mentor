import { Component, OnInit , AfterViewInit} from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder,Validators } from '@angular/forms';
import { passwordValidator } from 'src/app/validators/password-validaor';
import {MantorService  } from "../mantor.service";
import {RegisterMantor } from "../register-mantor";


@Component({
  selector: 'app-register-mantor',
  templateUrl: './register-mantor.component.html',
  styleUrls: ['./register-mantor.component.css']
})
export class RegisterMantorComponent implements OnInit ,AfterViewInit{
// --------------------------------------
notsubmited = true;
mantor:any
userexist :String;
validCode :String;
emailexist:String;
model = new RegisterMantor();
error: {};
startuparea:{};
// -------------------------------------
get cap(){
  return this.registerMantor.get('captchaVal')
}
get invitecodeData(){
  return this.registerMantor.get('invitecode')
}
  get userName(){
    return this.registerMantor.get('username')
  }
  get skypeId(){
    return this.registerMantor.get('skype_id')
  }
  get email(){
    return this.registerMantor.get('email')
  }
  get password(){
    return this.registerMantor.get('password')
  }
  get cpassword(){
    return this.registerMantor.get('cpassword')
  }
  registerMantor = this.fb.group({
    username:['', Validators.required],
    skype_id:['', Validators.required],
    captchaVal:['', Validators.required],
    email: ['' , [Validators.required,Validators.email]],
    password: ['', [Validators.required,Validators.minLength(8)]],
    cpassword: ['',Validators.required], 
    startuparea: [''],
    invitecode: ['', Validators.required],
    term:['',Validators.required]

  },{validator:passwordValidator});
  constructor(public router:Router ,private fb:FormBuilder,private rm:MantorService) { }
  ngOnInit() { 
    return this.rm.allStartuparea().subscribe(
      data =>this.startuparea=data,
      error => this.error = error
    );
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
   mantorReg(){
    this.notsubmited = true;
   }
   
   gotoPitchit(){
    this.router.navigate(['mentee/intrestarea'])
  }
  ifMantorExist(){
    return this.rm.ifMantorExist({"username":this.userName.value}).subscribe(
      data => this.userexist = data,
      error => this.error = error
    );
  }
  ifMantorEmailExist(){
    return this.rm.ifMantorEmailExist({"email":this.email.value}).subscribe(
      data => this.emailexist = data,
      error => this.error = error
    );
  }
  flag2:boolean=true;
  codeValidation(){
    return this.rm.codeValidation({"my_code":this.invitecodeData.value}).subscribe(
      data => {this.validCode = data; if(this.validCode=='Valid code'){this.flag2=false}else{this.flag2=true}},
      error => this.error = error
    );
  }
  register(){
    this.notsubmited = false;
    return this.rm.addMantor(this.registerMantor.value).subscribe(
      data => this.mantor=data,
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
  var x=this.registerMantor.controls.captchaVal.value;
  if(x==this.code){this.flag=true}else{this.flag=false}

}
  // =====================================================
  
}
