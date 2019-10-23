import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ManteeService } from '../../mantee.service';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-list-mentor',
  templateUrl: './list-mentor.component.html',
  styleUrls: ['./list-mentor.component.css']
})
export class ListMentorComponent implements OnInit {
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
    count = 1;
    constructor(public router: Router, private ms: ManteeService, private ds:DomSanitizer) { 
    }
    ngOnInit() {
      this.token = localStorage.getItem('token');
      this.token = this.helper.decodeToken(this.token);
      this.user_key = this.token['unique_key'];
      this.ms.allManteeCrouselDesk({'user_key':this.user_key}).subscribe(
        data => { this.allProfileDesk = data; },
        error => this.error = error
      );  
      this.ms.allManteeCrousel({'user_key':this.user_key}).subscribe(
        data => { this.allProfile = data; },
        error => this.error = error
      );
      this.width = window.innerWidth;
      if (this.width <= 768) {
        this.desktopview = false;
      } else {
        this.desktopview = true;
      } 
  
    }
    edit(id: any) {
      this.router.navigate(['/mentee/pitchit/' + id]);
  
    }
 
    followMsg:string;
   follow(key: any) {
   
     return this.ms.addFollow({ 'admin_key': key, 'user_key': this.user_key }).subscribe(
       data =>{ this.followMsg = data; this.ngOnInit();},
       error => this.error = error
     );

    }

    activeclass(d: any) {
      if (d[0].class == 'active') { this.count++; return true; }
    }
    profileDetail(id:any){
      this.router.navigate(['mentee/profile/'+id]);
    
     }
     viewAll(){
      this.router.navigate(['mentee/all']);
     }
  }

