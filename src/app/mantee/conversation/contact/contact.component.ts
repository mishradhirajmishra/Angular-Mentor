import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ManteeService } from '../../mantee.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  helper = new JwtHelperService(); 
  user_key: any;
  token:any;
  proid:string;
  contactList:any;
  error:{};
  searchText:String;
  userFilter: any = { name: '' };
  constructor(public router: Router, private ms: ManteeService, private actroute: ActivatedRoute) { }

  ngOnInit() {
    this.token =localStorage.getItem('token');
    this.token = this.helper.decodeToken(this.token);   
    this.user_key=this.token['unique_key'];    
    this.actroute.paramMap.subscribe(params => {
      this.proid=params.get('id');
    })
    this.chatContactList();
  }
  chatContactList(){
    this.ms.chatContactList({ 'admin_key': this.user_key, }).subscribe(
      data => { this.contactList = data;},
      error => this.error = error
    ); 
  }
  chatmsg:string;
  gotoChat(key:string,admin_key:string){

    // this.ms.updateChatMessage({ 'admin_key': admin_key,'user_key': key, }).subscribe(
    //   data => { this.chatmsg = data; },
    //   error => this.error = error
    // ); 
    this.router.navigate(['/mentee/conversation/chat/'+key]);
  }

}
