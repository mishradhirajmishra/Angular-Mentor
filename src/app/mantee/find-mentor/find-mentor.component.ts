import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ManteeService } from '../mantee.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-find-mentor',
  templateUrl: './find-mentor.component.html',
  styleUrls: ['./find-mentor.component.css']
})
export class FindMentorComponent implements OnInit {

  helper = new JwtHelperService();   
  user_key: any;  
  token: string;
  allProfile: any;
  allProfileDesk: any;
  error: {};   
  width: number;
  desktopview: boolean;
  imgfile: {};
  url: any;  
  profileLength:number;
  totalList:number=4; 
  count = 1;
  helpkey:string='';
  userFilter: any = { help_area: '' };
  constructor(public router: Router, private ms: ManteeService) { 
  }
  ngOnInit() {
    this.token = localStorage.getItem('token');
    this.token = this.helper.decodeToken(this.token);
    this.user_key = this.token['unique_key'];
 
    this.ms.allMentor({'user_key':this.user_key}).subscribe(
      data => { this.allProfile = data;  this.profileLength =this.allProfile.length;  },
      error => this.error = error
    );
    this.allHelpArea();
  }
  helparea:string;
  allHelpArea(){
    this.ms.adminAllHelpArea().subscribe(
      data => { this.helparea = data; },
      error => this.error = error
    );
  }
  subhelparea:string;
  getHelp(){
    this.ms.allSubHelpAreaByHelpAreaKey({'help_key':this.helpkey}).subscribe(
      data => { this.subhelparea = data; },
      error => this.error = error
    );

  }
  more(){
    this.totalList +=4;
  }

  followMsg:string;
 follow(key: any) {
 
   return this.ms.addFollow({ 'admin_key': key, 'user_key': this.user_key }).subscribe(
     data =>{ this.followMsg = data; this.ngOnInit();},
     error => this.error = error
   );

  }

  profileDetail(id:any){
    this.router.navigate(['mentee/profile/'+id]);
   }


}
