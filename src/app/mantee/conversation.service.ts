import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
// import { Observable } from "rxjs/operators";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ConversationService {
   private socket = io(environment.chatUrl);
  //  private socket = io("http://localhost:3000/");
  constructor() { }
  sendChatMessage(data:any){
  return  this.socket.emit('sendMessage',data);
  }
  sendTypingMessage(data:any){
    return  this.socket.emit('TypingMessage',data);
    }
  reciveMessageData(){
    let observable = new Observable<{'admin_key': String,'user_key': String,'room':String,'message':string }>((observer)=>{
       this.socket.on('reciveMessageData',(data)=>{
         observer.next(data);
       })
       return () => {this.socket.disconnect()}
    });
    return observable;
  }
  reciveTypingData(){
    let observable = new Observable<{'admin_key': String,'user_key': String,'room':String,'message':string }>((observer)=>{
       this.socket.on('reciveTypingMessageData',(data)=>{
         observer.next(data);
       })
       return () => {this.socket.disconnect()}
    });
    return observable;
  }
}
