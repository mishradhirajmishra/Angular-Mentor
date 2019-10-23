import { Title } from "@angular/platform-browser";
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { MainSericeService } from "../main-serice.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error:{};
  href:String
  constructor( public router:Router,private ms:MainSericeService,private ts:Title) { }
  title = "Login";
  usertype="";
  response:any;
  showInputVar:boolean=false;
  email:string;
  ngOnInit() {  
     this.ts.setTitle(this.title);
    //  this.ms.checkRole({'user_key':'debb0d06f95771cb25a11f369c73446b'}).subscribe(
    //   data => this.usertype=data,
    //   error => this.error = error
    // );
  }
  showinput(){
  this,this.showInputVar=true;
  }
  sendEmail(){
    return this.ms.sendEmailToUser({'email':this.email}).subscribe(
      data => this.response=data,
      error=>this.error=error
      ); 
  }
  register(){
    this.router.navigate(['/register']);
  }
  validateEmail(){
    return this.ms.validateEmail({'email':this.email}).subscribe(
      data => this.response=data,
      error=>this.error=error
      );    
  }
  login(data:NgForm){
    return this.ms.login(data.value).subscribe(
      data =>{        
        this.response=data.msg;
        if(data.redirect==true){          
          window.localStorage.clear();
          window.sessionStorage.clear();
          if(data.remember==true){
          localStorage.setItem("token", data.data);
          localStorage.setItem("profile", data.profile); 
          }else{
            sessionStorage.setItem("login",'sgfdwysawdgewudw7ey2eu2h2263728429039wqosjquey2734e28edsijakzna');
            localStorage.setItem("token", data.data); 
            localStorage.setItem("profile", data.profile); 
          }           
          if(data.type=="admin"){         
           window.location.replace(window.location.origin+'/admin/dasboard');         
          }else 
             {
              if(data.profile){
           window.location.replace(window.location.origin+'/mentee/dasboard');  
              }else{
                window.location.replace(window.location.origin+'/profile');  
              }       
          }
          }

      },
      error => this.error = error
    );
  }
}
