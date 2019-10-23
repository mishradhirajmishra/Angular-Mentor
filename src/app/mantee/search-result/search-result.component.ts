import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ManteeService } from '../mantee.service';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DomSanitizer} from '@angular/platform-browser';
@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {


  helper = new JwtHelperService();   
  user_key: any;  
  token: string;
  allProfile: any;
  allProfileDesk: any;
  error: {};   
  width: number;
  desktopview: boolean;
  imgfile: {};
  proid:string;
  url: any;  
  profileLength:number;
  totalList:number=4; 
  count = 1;
  userFilter: any = { username: '' };
  constructor(public router: Router, private ms: ManteeService, private ds:DomSanitizer,private actroute: ActivatedRoute) { 
  }
  ngOnInit() {
    this.token = localStorage.getItem('token');
    this.token = this.helper.decodeToken(this.token);
    this.user_key = this.token['unique_key'];
    this.actroute.paramMap.subscribe(params => {
      this.proid=params.get('id');

    })
 
    this.ms.searchUser({'search':this.proid}).subscribe(
      data => { this.allProfile = data;  this.profileLength =this.allProfile.length; },
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
