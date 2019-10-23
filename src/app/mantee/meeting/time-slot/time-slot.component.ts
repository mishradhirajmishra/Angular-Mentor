import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { ManteeService } from '../../mantee.service';
import { JwtHelperService } from '@auth0/angular-jwt';




@Component({
  selector: 'app-time-slot',
  templateUrl: './time-slot.component.html',
  styleUrls: ['./time-slot.component.css']
})
export class TimeSlotComponent implements OnInit {
  helper = new JwtHelperService();
  user_key: String;
  token: any;
  model:any;
 allMeeting:any;
  error: {};
  msg:string = "";
  hide:boolean = false;
    // ===========
    public dateTimeRange: Date[];
    public min = new Date();

  constructor(public router: Router, private fb: FormBuilder, private ms: ManteeService) { }

  ngOnInit() {
    this.token = localStorage.getItem('token');
    this.token = this.helper.decodeToken(this.token);
    this.user_key = this.token['unique_key'];
    this.ms.allMeetingOfAdmin({'admin_key':this.user_key}).subscribe(
      data => {this.allMeeting = data;  this.hide=false;},
      error => this.error = error
    ); 
  }
  showInput(){
    this.hide=true;
  }

  addDate(){  
    if (this.dateTimeRange[0].toDateString() !== this.dateTimeRange[1].toDateString()) {
      this.msg = "please select same date";
    }
    else{
      this.msg = "";
      return this.ms.addMeeting({'admin_key':this.user_key,'start_time':this.dateTimeRange[0],'end_time':this.dateTimeRange[1]}).subscribe(
        data => {this.model = data;  this.ngOnInit();  },
        error => this.error = error
      ); 
     
    }
    

  }
  delete(id:any){
    var result = confirm("are you sure you want to delete ?");
    if (result) {
      return this.ms.deleteMeeting({'id':id}).subscribe(
        data => {this.model = data;  this.ngOnInit(); },
        error => this.error = error
      ); 
    }
  }


}
