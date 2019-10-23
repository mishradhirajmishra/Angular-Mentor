import { Component } from '@angular/core';
import { Router,ActivatedRoute  } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 segment:any;
  title = 'mentor';
  userType:string;
  token: string;
  width:number;
  showsidebar:boolean;
  helper = new JwtHelperService();

  constructor(public router:Router ,private actroute: ActivatedRoute){}
  ngOnInit(){
    this.token = localStorage.getItem('token');
    if(this.token){
    this.token = this.helper.decodeToken(this.token);
    this.userType = this.token['usertype'];
    }
    this.chkScreenSize();
  }
  chkScreenSize(){
    this.width = window.innerWidth;
    if (this.width <= 991) {
      this.showsidebar=false;
   
    } else {
      this.showsidebar=true;

    } 
  }
  
  sidebar(){
    if(this.showsidebar==true)
   {this.showsidebar=false;}else{this.showsidebar=true;}
  }
}
