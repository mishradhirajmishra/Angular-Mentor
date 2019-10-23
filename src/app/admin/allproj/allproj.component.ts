import { Component, OnInit } from '@angular/core';
import { Router ,ActivatedRoute} from '@angular/router';
import { AdminService } from '../admin.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-allproj',
  templateUrl: './allproj.component.html',
  styleUrls: ['./allproj.component.css']
})
export class AllprojComponent implements OnInit {

  helper = new JwtHelperService();   
  user_key: any;  
  token: string;
  allUser: any;
  intrestData= {'projName':'','id':''};
  name:string="xyz";
  error: {};  
  btnText = 'Add'; 
  nameFilter: any = { projName: '' };
  proid:string;
  projStatus:String;
  constructor(public router: Router, private as: AdminService , private ds:DomSanitizer, private actroute: ActivatedRoute) { 
  }
  ngOnInit() {
    this.token = localStorage.getItem('token');
    this.token = this.helper.decodeToken(this.token);
    this.user_key = this.token['unique_key']; 
    this.actroute.paramMap.subscribe(params => {
      this.proid=params.get('id');
    })
    this.allintfun();
  }
  allintfun(){
    this.as.adminAllProject({'user_key':this.proid}).subscribe(
      data => { this.allUser = data; },
      error => this.error = error
    );
  }
  view(key:String){
   this.router.navigate(['admin/project-detail/'+key])
  } 
  babaStart(key:String){
    this.router.navigate(['babastart/'+key])
  }
  owner(key:String){
    this.router.navigate(['/admin/profile/'+key])
   }
   msg:string;
   projapprove(id:string){
    this.as.adminAddProjectApproval({'status':'approved','id':id}).subscribe(
      data => { this.msg = data ;  this.allintfun(); },
      error => this.error = error
    );
   }
   projreject(id:string){
    this.as.adminAddProjectApproval({'status':'rejected','id':id}).subscribe(
      data => { this.msg = data;  this.allintfun();},
      error => this.error = error
    );
  }
}
