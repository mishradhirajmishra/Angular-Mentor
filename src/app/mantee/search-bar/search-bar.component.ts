import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { NgForm } from "@angular/forms";
import { ManteeService } from '../mantee.service';
import { JwtHelperService } from '@auth0/angular-jwt';
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  searchKey:any='';
  helper = new JwtHelperService();
  user_key: any;
  token: string;
  message:number;
  unReadessage:number;
  error:{};
  usertype:string;
  constructor(public router: Router,private ms: ManteeService) {  }


  ngOnInit() {
    this.token = localStorage.getItem('token');
    this.token = this.helper.decodeToken(this.token);
    this.user_key = this.token['unique_key'];
    this.usertype=this.token['usertype'];
    this.ms.allNotificationCount({'admin_key':this.user_key}).subscribe(
      data => {this.message = data;},
      error => this.error = error
    ); 
    this.ms.allUnreadMessage({'admin_key':this.user_key}).subscribe(
      data => {this.unReadessage = data;},
      error => this.error = error
    ); 

  }
  notification(){
    this.router.navigate(['mentee/notification'])
  }
  contactList(){
    this.router.navigate(['/mentee/conversation/contact-list'])
  }
  getResult(){ 
   this.router.navigate(['mentee/saerch-result/'+this.searchKey])
  }
}
