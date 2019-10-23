import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { ManteeService } from '../../mantee.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.component.html',
  styleUrls: ['./upcoming.component.css']
})
export class UpcomingComponent implements OnInit {

  helper = new JwtHelperService();
  user_key: String;
  token: any;
  model: any;
  allMeeting: any;
  rejMeeting: any;
  error: {};
  msg: string = "";
  skypeInstaled: boolean;

  constructor(public router: Router, private fb: FormBuilder, private ms: ManteeService, private ds: DomSanitizer) { }

  ngOnInit() {
    this.token = localStorage.getItem('token');
    this.token = this.helper.decodeToken(this.token);
    this.user_key = this.token['unique_key'];
    this.ms.upcommingMeeting({ 'admin_key': this.user_key }).subscribe(
      data => { this.allMeeting = data; },
      error => this.error = error
    );
    this.ms.rejectedMeeting({ 'admin_key': this.user_key }).subscribe(
      data => { this.rejMeeting = data; },
      error => this.error = error
    );
    this.skypeCheck();
  }
  delete(id: any) {
    this.ms.deleteRejectedMeeting({ 'id': id }).subscribe(
      data => { this.msg = data; this.ngOnInit(); },
      error => this.error = error
    );
  }

  profile(id: any) {
    this.router.navigate(['mentee/profile/' + id]);

  }
  cancelRequest(id: number) {
    this.ms.cancelMeetingByUser({ 'id': id }).subscribe(
      data => { this.msg = data; this.ngOnInit(); },
      error => this.error = error
    );
  }
  conferance(id: any) {
    this.router.navigate(['mentee/conversation/' + id]);

  }
  rematks(id: any) {
    this.router.navigate(['mentee/profile/' + id]);

  }
  chaturl(url: string) {
    return this.ds.bypassSecurityTrustUrl(url);
  }
  skypeCheck() {
    if (typeof (navigator.mimeTypes["application/x-skype"]) == "object") {
      this.skypeInstaled = true;
    }
    else {
      this.skypeInstaled = false;
    }
  }

}
