import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.css']
})
export class MeetingComponent implements OnInit {

  error: {};  
  meetings:any;
  constructor(public router: Router, private as: AdminService ) { 
  }
  ngOnInit() {

    this.allmeeting();
  }

  allmeeting(){
   this.as.allMeetingAdminDashboard().subscribe(
     data=>{this.meetings=data;}
     ,error=>this.error=error
   )
  }

}
