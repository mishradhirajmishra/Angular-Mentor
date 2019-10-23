import { Title } from "@angular/platform-browser";
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { MainSericeService } from "../main-serice.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  email:string;
  msg:string;
  error:{};
  constructor(public router:Router,private ms:MainSericeService,private ts:Title) { }

  ngOnInit() {
  }
  validateEmail(email:string) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
  subscribe(){
    var x = this.validateEmail(this.email);
    if(x){
      return this.ms.addSubscriber({'email':this.email}).subscribe(
        data => this.msg=data,
        error=>this.error=error
        );  
  
  }else{this.msg='please Enter a valid email .'}

  }

}
