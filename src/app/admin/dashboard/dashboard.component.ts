import { Component, OnInit } from '@angular/core';
import {AdminService } from "../admin.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
   helpArea:number=0;
   intresrArea:number=0;
   mentor:number=0;
   mentee:number=0;
   user:number=0;
   projects:number=0;
   approved:number=0;
   pending:number=0;
   rejected:number=0;
   error:{};

  constructor(private as:AdminService,public router:Router) { }

  ngOnInit() {
    this.allhelp();
    this.allintrest();
    this.adminUser();
    this.allMentor();
    this.allMentee();
    this.allProject();
    this.allApprobed();
    this.allRejcted();
    this.allpending();
    this.allmeeting();
    this.adminBabaStartCount();
    this.adminSubscriberCount();
    
  }
  allhelp(){
   this.as.adminHelpAreaCount().subscribe(
     data=>this.helpArea=data,error=>this.error=error
   )
  }
  allintrest(){
    this.as.adminIntrestAreaCount().subscribe(
      data=>this.intresrArea=data,error=>this.error=error
    )
   }
   adminUser(){
    this.as.adminUserCount().subscribe(
      data=>this.user=data,error=>this.error=error
    )
   }
   allMentor(){
    this.as.adminMentorCount().subscribe(
      data=>this.mentor=data,error=>this.error=error
    )
   }
   allMentee(){
    this.as.adminMenteeCount().subscribe(
      data=>this.mentee=data,error=>this.error=error
    )
   }
   allProject(){
    this.as.adminProjectsCount().subscribe(
      data=>this.projects=data,error=>this.error=error
    )
   }
   allApprobed(){
    this.as.adminApprovedProjectsCount().subscribe(
      data=>this.approved=data,error=>this.error=error
    )
   }
   allRejcted(){
    this.as.adminRejectedProjectsCount().subscribe(
      data=>this.rejected=data,error=>this.error=error
    )
   }
   allpending(){
    this.as.adminPendingProjectsCount().subscribe(
      data=>this.pending=data,error=>this.error=error
    )
   }
   adminSubscriberCountvar:any;
   adminSubscriberCount(){
    this.as.adminSubscriberCount().subscribe(
      data=>this.adminSubscriberCountvar=data,error=>this.error=error
    )
   }
   adminBabaStartCountvar:any;
   adminBabaStartCount(){
    this.as.adminBabaStartCount().subscribe(
      data=>this.adminBabaStartCountvar=data,error=>this.error=error
    )
   }
   meetings:any;
   allmeeting(){
    this.as.allMeetingAdminDashboardToday().subscribe(
      data=>this.meetings=data,error=>this.error=error
    )
   }
// ===============================
intrestArea(){
  this.router.navigate(['admin/intrestarea'])
}

alluser(){
  this.router.navigate(['admin/alluser'])
}
allproj(){
  this.router.navigate(['admin/allproject'])
}
helpAreafun(){
  this.router.navigate(['admin/helparea'])
}
Subscriber(){
  this.router.navigate(['admin/subscriber'])
}
}
