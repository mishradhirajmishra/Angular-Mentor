import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ManteeService } from '../mantee.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgForm } from "@angular/forms";
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  imageChangedEvent: any = '';
    croppedImage: any = '';
    

  error: {};

  url:any;
  imgfile:File;
  token:any;
  user_key:any;
  profileImage:any;
  profileName:String;
  profileBio:String;
  model:any; 
  logoutvar:any; 
  userRole:string;
  edit=true;
  helper = new JwtHelperService();
  width:number;
  showsidebar:boolean;
  mobileview:boolean;
  constructor(public router: Router,private ms:ManteeService) { }

  ngOnInit() {
    this.token =localStorage.getItem('token');
    this.token = this.helper.decodeToken(this.token);   
    this.user_key=this.token['unique_key'];
     this.userRole=this.token['role'];
    this.ms.profileImage({'user_key':this.user_key}).subscribe(
      data => {this.profileImage = data;},
      error => this.error = error
    );  
    this.ms.getProfile({'user_key':this.user_key}).subscribe(
      data => {this.profileName = data.name;this.profileBio= data.bio.substring(0, 100);},
      error => this.error = error
    );  
    this.todayAllMeetingCount(); 
    this.chkScreenSize();
  }
  chkScreenSize(){
    this.width = window.innerWidth;
    if (this.width <= 991) {
      this.showsidebar=false;
      this.mobileview=true;

    } else {
      this.showsidebar=true;
      this.mobileview=false;
    } 
  }
  meetingCount:number;
  todayAllMeetingCount(){
    this.ms.todayAllMeetingCount({'user_key':this.user_key}).subscribe(
      data => {this.meetingCount = data; console.log(this.meetingCount)},
      error => this.error = error
    );  
  }
  editfun(){
    this.edit=false
  }
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
}
imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.file;
    // console.log(this.croppedImage);
}

  onSelectChange(event:any){
    this.imageChangedEvent = event;
    this.imgfile = <File>event.target.files[0]; 
     this.url=this.croppedImage
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
      
       this.url= (<FileReader>event.target).result;

      }
    }
  } 
  updateProfileImage(){ 
    this.profileName ='Please wait ...';
    this.imageChangedEvent='';
    const formData = new FormData();
    formData.append('user_key',this.user_key); 
    formData.append('data',this.croppedImage,this.imgfile.name); 
    return this.ms.updateProfileImage(formData).subscribe(
      data => {this.model = data;location.reload()},
      error => this.error = error
    );         
  }
  account() {
    if(this.mobileview){this.showsidebar=false}
    this.router.navigate(['mentee/account']);  
  }
  myprofile() {
    if(this.mobileview){this.showsidebar=false}
    this.router.navigate(['mentee/myprofile']);
  }
  profile() {
    if(this.mobileview){this.showsidebar=false}
    this.router.navigate(['mentee/profile/'+this.user_key]);
  }
  pitchit() {
    if(this.mobileview){this.showsidebar=false}
    this.router.navigate(['mentee/pitchit-detail']);
  }
  intrestArea() {
    if(this.mobileview){this.showsidebar=false}
    this.router.navigate(['mentee/intrestarea']);
  }
  conversation() {
    if(this.mobileview){this.showsidebar=false}
    this.router.navigate(['mentee/conversation/contact-list']);
  }
  meeting() {
    if(this.mobileview){this.showsidebar=false}
    this.router.navigate(['/mentee/meeting/time-slot']);
  }
  mypost() {
    if(this.mobileview){this.showsidebar=false}
    this.router.navigate(['mentee/mypost']);
  }

  looutServer(){
    return this.ms.logout({'user_key':this.user_key}).subscribe(
      data => {this.logoutvar = data; console.log(data);
      },
      error => this.error = error
    );  
  }
  logout() {
    this.looutServer();
    window.localStorage.clear();
    location.reload()
  }
  home(){
    if(this.mobileview){this.showsidebar=false}
    this.router.navigate(['/mentee/dasboard']);
    // location.replace('/mentee/dasboard')
  }
  allPeople(){
    if(this.mobileview){this.showsidebar=false}
    this.router.navigate(['/mentee/all']);
    // location.replace('/mentee/dasboard')
  }
  follower(){
    if(this.mobileview){this.showsidebar=false}
    this.router.navigate(['/mentee/follower/'+this.user_key]);
    // location.replace('/mentee/dasboard')
  }
  helpArea(){
    if(this.mobileview){this.showsidebar=false}
    this.router.navigate(['/mentor/helpArea']);
    // this.router.navigate(['/mentor/helpArea/category']);
  }
  findMentor(){
    if(this.mobileview){this.showsidebar=false}
    this.router.navigate(['/mentor/find-mentor']);
  }
  sidebar(){
    if(this.showsidebar==true)
   {this.showsidebar=false;}else{this.showsidebar=true;}
  }
}
