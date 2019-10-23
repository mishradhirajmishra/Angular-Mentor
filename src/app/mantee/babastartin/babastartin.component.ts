import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {FormBuilder,Validators } from '@angular/forms';
import { ManteeService } from '../mantee.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-babastartin',
  templateUrl: './babastartin.component.html',
  styleUrls: ['./babastartin.component.css']
})
export class BabastartinComponent implements OnInit {

  helper = new JwtHelperService();
  user_key:String;
  token:string;
   msg:string;
  error:{};
  sub='true';

  user_role:string;
  proid :string;
  projects:{};
  constructor(public router:Router ,private ms:ManteeService, private actroute: ActivatedRoute,private fb:FormBuilder, ) {   }
  fund = this.fb.group({
    description:['', Validators.required],
    team_desc:[''],
    raised_money: [''],
    money_needed: [''],
    equity: [''],
    g_s_link: [''],
    c_url: [''],
    p_url: [''],
    term:['', Validators.required]
  });
  get terms(){
    return this.fund.get('term')
  }
  get description(){
    return this.fund.get('description')
  }
  ngOnInit() {
    this.token =localStorage.getItem('token');
    this.token = this.helper.decodeToken(this.token);   
    this.user_key=this.token['unique_key']; 
    this.user_role = this.token['usertype'];
    this.actroute.paramMap.subscribe(params => {
      this.proid = params.get('id');
      this.projectDetailFun();
    })   
 
    console.log(this.proid)
  }
  projectDetailFun(){
    this.ms.babaStartByProjectKey({'project_key':this.proid}).subscribe(
      data => {this.projects = data; },
      error => this.error = error
    ); 
  }
  register(){
    this.ms.addBabaStart({'data':this.fund.value,'project_key':this.proid}).subscribe(
      data => {this.msg = data;     this.projectDetailFun(); },
      error => this.error = error
    );
    
  }
  projectDetail(){
    this.router.navigate(['/mentee/project-detail/'+this.proid]);
  }
}
