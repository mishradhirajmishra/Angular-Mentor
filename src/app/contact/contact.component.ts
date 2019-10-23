import { Component, OnInit } from '@angular/core';
import {FormBuilder,Validators } from '@angular/forms';
import { MainSericeService } from '../main-serice.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  error:{};
  constructor( public router:Router,private fb:FormBuilder,private ms:MainSericeService,private ts:Title) { }
  title = "Contact -  us";
  get userName(){
    return this.updateAccount.get('name')
  }
  get email(){
    return this.updateAccount.get('email')
  }
  get mobile(){
    return this.updateAccount.get('mobile')
  }
   updateAccount = this.fb.group({
    name:['', Validators.required],
    email:['' , [Validators.required,Validators.email]],
    mobile: ['', Validators.required]
    });
  ngOnInit() {  
     this.ts.setTitle(this.title);
  }
  response:string;
  register(){
   this.ms.contactUs({"data":this.updateAccount.value}).subscribe(
      data => this.response=data,
      error=>this.error=error
      ); 
  }

}
