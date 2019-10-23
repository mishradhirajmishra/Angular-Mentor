import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ManteeService } from '../mantee.service';
import { JwtHelperService } from '@auth0/angular-jwt';
@Component({
  selector: 'app-pitchit-datail',
  templateUrl: './pitchit-datail.component.html',
  styleUrls: ['./pitchit-datail.component.css']
})
export class PitchitDatailComponent implements OnInit {

  helper = new JwtHelperService();
  user_key:String;
  token:string;
  allProjects:String;
  error:{};
  sub='true';
  ppp:any;
  color=false;


  constructor(public router:Router ,private ms:ManteeService) {

   }

  ngOnInit() {
    this.token =localStorage.getItem('token');
    this.token = this.helper.decodeToken(this.token);   
    this.user_key=this.token['unique_key'];    
    this.ms.manteeAllProjects({'user_key':this.user_key}).subscribe(
      data => {this.allProjects = data; },
      error => this.error = error
    );  
  }
   edit(id:any){
    this.router.navigate(['/mentee/pitchit/'+id]);
 
   }
   findMentor(){
    this.router.navigate(['/mentor/find-mentor']);
   }
   projectDetail(id:any){
    this.router.navigate(['/mentee/project-detail/'+id]);
 
   }
   babastart(id:any){
    this.router.navigate(['/babastart/'+id]);
 
   }
  pitchit(){
      this.router.navigate(['/mentee/pitchit']);
  }
  submited(){
     this.sub='true';
     this.color=false;
  }
  draft(){
    this.sub='false';
    this.color=true;
  }


}
