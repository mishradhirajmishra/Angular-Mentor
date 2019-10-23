import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.css']
})
export class MeetingComponent implements OnInit {

  constructor(public router:Router,private activatedRoute:ActivatedRoute) { }

  ngOnInit() {

  }
  timeSlot(){
  this.router.navigate(['/mentee/meeting/time-slot']);
  }
  meeting(){
    this.router.navigate(['/mentee/meeting/upcoming']);
  }
  manage(){
    this.router.navigate(['/mentee/meeting/manage']);
  }

}
