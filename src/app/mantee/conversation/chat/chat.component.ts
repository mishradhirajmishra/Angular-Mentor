import { Component, OnInit,  AfterViewChecked } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ManteeService } from '../../mantee.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ConversationService } from '../../conversation.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements AfterViewChecked, OnInit{

  helper = new JwtHelperService();
  msg: string;
  user_key: any;
  token: any;
  proid: string;
  typingMsg:string;
  chatprofile: any;
  error: {};
  searchText: String;
  userFilter: any = { name: '' };
  room: string;
  message: string;
  myProfileImage: string;
  userName:string;
 
  messageArray: Array<{ 'admin_key': String, 'user_key': String, 'room': String, 'message': string }> = [];
  constructor(private chatService: ConversationService, public router: Router, private ms: ManteeService, private actroute: ActivatedRoute) {
    this.reciveMessage();this.reciveTypingMessage();    
  }
  bottom:boolean=true;
  ngAfterViewChecked(){
    if(this.bottom==true){
      this.scrollToBottom();    
    }
  
  }

  ngOnInit() {

    this.token = localStorage.getItem('token');
    this.token = this.helper.decodeToken(this.token);

    this.user_key = this.token['unique_key'];
    this.myProfileImage = this.token['image'];
    this.userName = this.token['username'];
    this.actroute.paramMap.subscribe(params => {
      this.proid = params.get('id');
    })  
    this.chatContactProfile();
    this.chatRoom(); 

  }
  sendMessage() {
    this.addMessageToDb();
    this.chatService.sendChatMessage({ 'admin_key': this.user_key, 'user_key': this.proid, 'room': this.room, 'message': this.message });
    this.message="";
  }
  addMessageToDb() {
    this.ms.addChatMessage({ 'admin_key': this.user_key, 'user_key': this.proid, 'room': this.room, 'message': this.message }).subscribe(
      data => this.msg = data,
      error => this.error = error
    );
  }

  reciveMessage() {
    this.chatService.reciveMessageData().subscribe(
      data => { if (this.room == data.room) { this.messageArray.push(data);this.scrollToBottom();    } },
      error => this.error = error
    );
  }
  reciveTypingMessage() {
    this.typingMsg="";
    this.chatService.reciveTypingData().subscribe(
      data =>  { if (this.room == data.room) { this.typingMsg=data.message;  }} ,
      error => this.error = error
    );
  }
  chatContactProfile() {
    this.ms.chatProfile({ 'unique_key': this.proid, }).subscribe(
      data => { this.chatprofile = data; },
      error => this.error = error
    );
  }
  chatRoom() {
    this.ms.chatRoom({'admin_key': this.user_key, 'user_key': this.proid, }).subscribe(
      data => { this.room = data;   this.getMessageFromDb();},
      error => this.error = error
    );
  }
  getMessageFromDb() {
    this.ms.allChatMessage({ 'room': this.room }).subscribe(
      data => {if(data){this.messageArray = data;  if(data){this.scrollToBottom();}}},
      error => this.error = error
    );
  }
  chatmsg:string;
  gotoContact() {
  
    this.ms.updateChatMessage({ 'admin_key': this.user_key,'user_key': this.proid, }).subscribe(
      data => { this.chatmsg = data;     this.router.navigate(['/mentee/conversation/contact-list']);},
      error => this.error = error
    ); 

  }


  typing(){
    this.bottom=false;
    this.chatService.sendTypingMessage({ 'admin_key': this.user_key, 'user_key': this.proid, 'room': this.room, 'message': this.userName + ' is typing ...' });
  }
  lefttyping(){
    this.bottom=false;
    this.chatService.sendTypingMessage({ 'admin_key': this.user_key, 'user_key': this.proid, 'room': this.room, 'message': '' });

  }
  inactive(){
 
    this.bottom=false;
  }
  scrollToBottom(){
   var  bottomChat = document.getElementById("bottom-chat");
   bottomChat.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
  }
  scrollToTop(){   
    var  topChat = document.getElementById("top-chat");
    topChat.scrollIntoView();
   }
   
   deleteMsg(id:number){
     var delmsg="";
    this.ms.deletrChatMessage({ 'id': id }).subscribe(
      data => { delmsg=data;this.getMessageFromDb();},
      error => this.error = error
    );
   }
   updateStatus(){
    this.ms.updateChatMessage({ 'admin_key': this.user_key,'user_key': this.proid, }).subscribe(
      data => { this.chatmsg = data;},
      error => this.error = error
    ); 
   }
}
