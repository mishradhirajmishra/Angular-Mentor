import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { ManteeService } from '../mantee.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DomSanitizer } from '@angular/platform-browser';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.css']
})
export class ProfileDetailComponent implements OnInit {
  helper = new JwtHelperService();
  user_key: String;
  proid: string;
  notsubmited = true;
  model: any;
  token: string;
  profileData: any;
  manteeProfileExplist: any;
  manteeProfileEdulist: any;
  formhide = true;
  profileImage: any;
  allProjects: any;
  allintrest: any;
  allPost: any;
  start: number=0;
  allPostTemp: any;
  contactExistVar: boolean;
  error: {};
  postLenth:number;
   postCount:number;
   postCountInc:number=0;
   user_image:string;
   user_name:string;
   name:string;
   user_role:string;
   allHelpVar:any;
   commentCount:number=1;
  constructor(public router: Router, private fb: FormBuilder, private ms: ManteeService, private actroute: ActivatedRoute, private ds: DomSanitizer) { }

  ngOnInit() {
    this.token = localStorage.getItem('token');
    this.token = this.helper.decodeToken(this.token);
    this.user_key = this.token['unique_key'];
    this.user_image = this.token['image'];
    this.user_name = this.token['username'];
    this.name = localStorage.getItem('profile');

    this.user_role = this.token['usertype'];
    this.actroute.paramMap.subscribe(params => {
      this.proid = params.get('id');
    })
    this.ms.otherProfile({ 'user_key': this.proid }).subscribe(
      data => { this.profileData = data; },
      error => this.error = error
    );

    this.ms.profileImage({ 'user_key': this.proid }).subscribe(
      data => { this.profileImage = data; },
      error => this.error = error
    );
    this.ms.allApprovedProjectOfMantee({ 'user_key': this.proid,'req_key':this.user_key }).subscribe(
      data => { this.allProjects = data; },
      error => this.error = error
    );
    this.ms.allIntrest({ 'user_key': this.proid }).subscribe(
      data => this.allintrest = data,
      error => this.error = error
    );
  
    this.ms.allHelpArea({ 'user_key': this.proid }).subscribe(
      data => this.allHelpVar = data,
      error => this.error = error
    );
    this.getPostFirst();
    this.contactExist();
    this.loginstatus();
    this.allfollow();
    this.isfollow();
  }
  chk() {
    this.postCountInc = this.postCountInc + 2;
    // this.getPostRem();
  }
  loginStatusVar:string;
  loginstatus(){
    return  this.ms.loginStatusIndividual({ 'user_key': this.proid }).subscribe(
      data => { this.loginStatusVar =data},
      error => this.error = error
    );
  }

  getPostFirst() {
    return this.ms.manteeAllPost({ 'user_key': this.proid,'user_key_of_admin': this.user_key, 'start': this.start }).subscribe(
      data => { this.allPost = data.data; this.start = data.last_id;
         this.postCount=data.postCount; 
         if(this.postCount){
         this.postLenth=this.allPost.length; 
       
         }
        //  this.allPost =this.allPost.reverse();
         },
      error => this.error = error
    );
  }
  // getPostRem() {
  //   return this.ms.manteeAllPost({ 'user_key': this.proid, 'start': this.start }).subscribe(
  //     data => {
  //     this.allPostTemp = data.data; this.start = data.last_id;
  //       this.allPost = [...this.allPost, ...this.allPostTemp];
  //       this.postCount=data.postCount; this.postLenth=this.allPost.length ;

  //     },
  //     error => this.error = error
  //   );
  // }
  geturl(video: any) {
    return this.ds.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + video);
  }

   followMsg:string;
   followtxt:string="Follow";
  follow() {
    if(this.followtxt=="Follow"){
    return this.ms.addFollow({ 'admin_key': this.proid, 'user_key': this.user_key }).subscribe(
      data =>{ this.followMsg = data;this.followtxt="Following"},
      error => this.error = error
    );
    }
   }
   allfollowMsg:number;
   allfollow() {
    return this.ms.allFollowCount({ 'admin_key': this.proid}).subscribe(
      data => this.allfollowMsg = data,
      error => this.error = error
    );
   }
   isFllowMsg:string;
   isfollow() {
    return this.ms.isFollow({ 'admin_key': this.proid, 'user_key': this.user_key }).subscribe(
      data => this.isFllowMsg = data,
      error => this.error = error
    );
   }
  contactExist() {
    return this.ms.chatContactExist({ 'admin_key': this.user_key, 'user_key': this.proid }).subscribe(
      data => this.contactExistVar = data,
      error => this.error = error
    );
  }
  message() {

    if (!this.contactExistVar) {
    return this.ms.addChatContact({ 'admin_key': this.user_key, 'user_key': this.proid }).subscribe(
      data =>{this.contactExist(); this.router.navigate(['mentee/conversation/contact-list/' + this.proid]);},
      error => this.error = error
    );
    }
    else{
      this.router.navigate(['mentee/conversation/chat/' + this.proid]);
    }
  }
  meeetingRequest() {
    this.router.navigate(['mentee/req-meeting/' + this.proid]);
  }
  // ============================

  likeMsg:any;
  addLike(post_key:string,index:number){
    this.allPost[index].like_status = true;
    this.allPost[index].like += 1;
    return this.ms.addPostLike({ 'post_key': post_key, 'user_key': this.user_key }).subscribe(
      data =>{ this.likeMsg = data; },
      error => this.error = error
    );
  }
  addComment(post_key:string,admin_key:string,index:number){
    var comment = this.allPost[index].comment_write;
    return this.ms.addPostComment({ 'post_key': post_key,'admin_key':admin_key, 'user_key': this.user_key,'comment':comment }).subscribe(
      data =>{ this.likeMsg = data; this.allPost[index].comment_write="";this.showComment(post_key,index); this.allPost[index].comment +=1;},
      error => this.error = error
    );
  }
  showComment(post_key:string,i:number){
    this.allPost[i].show_more =true;
    return this.ms.allPostComment({'post_key': post_key}).subscribe(
      data => this.allPost[i].all_comment = data,  
      error => this.error = error
    ); 
  }

  moreComment(post_key:string,index:number){
 
    this.allPost[index].comment_limit += 1;
  }
  // ============================
  replyComment(post_key:string,index:number,comm_id:number,admin_key:string,c_index:number){
    var reply = this.allPost[index].all_comment[c_index].reply_write;
    this.allPost[index].all_comment[c_index].reply_show=false;
    return this.ms.addPostCommentReply({ 'post_key': post_key,'admin_key': admin_key, 'user_key': this.user_key, 'comment_id': comm_id,'reply':reply }).subscribe(
      data =>{this.allReplyComment(post_key,index,comm_id,c_index);this.allPost[index].all_comment[c_index].reply_write="";this.allPost[index].all_comment[c_index].reply_count +=1 },
      error => this.error = error
    );
  }

  allReplyComment(post_key:string,index:number,comm_id:number,c_index:number){
    var show = this.allPost[index].all_comment[c_index].reply_show;
    if(show==true){this.allPost[index].all_comment[c_index].reply_show=false}else{this.allPost[index].all_comment[c_index].reply_show=true}
     return this.ms.allPostCommentReply({ 'post_key': post_key,  'comment_id': comm_id}).subscribe(
      data =>{ this.allPost[index].all_comment[c_index].reply=data;},
      error => this.error = error
    );
  }
  msg:string;
  deletePost(post_id:number,post_user_key:string,index:number){

    return this.ms.deletePost({'id': post_id}).subscribe(
      data => { this.msg = data;this.ngOnInit();},  
      error => this.error = error
    ); 
  }
  listFolower(){
    this.router.navigate(['mentee/follower/'+this.proid])
  }
  manageProfile(){
    this.router.navigate(['/mentee/myprofile'])
  }

  viewProject(id:string){
    this.router.navigate(['mentee/project-detail/'+id])
  }
  // requestData:string;
  // requestStatus:boolean=false;
  // showForm:boolean=false;
  // permited:boolean=false;
  viewForm(index:number){
   this.allProjects[index].showForm=true;
  }
  makeRequest(project_key:string,proj_owner_key:string,index:number){
    // console.log(this.requestData)
    var requestData =this.allProjects[index].requestData;
    this.ms.addProjectRequestToView({'project_key':project_key,'proj_owner_key':proj_owner_key,'request':requestData,'req_key':this.user_key}).subscribe(
      data => { this.msg = data;  this.allProjects[index].showForm=false;this.allProjects[index].requestStatus=true;},  
      error => this.error = error
    ); 
  }
  checkStatus(project_key:string,index:number){
    this.ms.checkProjectRequestToViewStatus({'project_key':project_key,'req_key':this.user_key,}).subscribe(
      data => { this.allProjects[index].requestStatus= data;},  
      error => this.error = error
    );
  }

}


