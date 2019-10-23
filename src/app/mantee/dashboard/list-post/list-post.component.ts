import { ChangeDetectionStrategy,Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ManteeService } from '../../mantee.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DomSanitizer} from '@angular/platform-browser';
import { Post } from '../../post';


@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.css'],
//  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListPostComponent implements OnInit {
  items = Array.from({length: 100000}).map((_, i) => `Item #${i}`);
  helper = new JwtHelperService(); 
  user_key: any;
  token: string; 
  error: {};
  count = 1; 
  url: any;
  allPost:any;
  allPostTemp:any;
  start=0;
  ev:any;
  user_image:string;
  user_name:string;
  name:string;
  user_role:string;
  commentCount:number=1;
  constructor(public router: Router, private ms: ManteeService, private ds:DomSanitizer) { 
  }
  ngOnInit() {
    this.token = localStorage.getItem('token');
    this.token = this.helper.decodeToken(this.token);
    this.user_key = this.token['unique_key'];
    this.user_image = this.token['image'];
    this.user_name = this.token['username'];
    this.name = localStorage.getItem('profile');

    this.user_role = this.token['usertype'];
   
    this.getPostFirst();
  }
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
      data =>{ this.likeMsg = data; this.allPost[index].comment_write="";this.showComment(post_key,index); this.allPost[index].comment +=1; this.allPost[index].show_comment=true},
      error => this.error = error
    );
  }
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
  chk(){
     this.getPostRem();
  }
  getPostFirst() {
    return this.ms.allPost({'user_key': this.user_key,'start':this.start}).subscribe(
      data => {this.allPost= data.data;this.start=data.last_id;  },  
      error => this.error = error
    );    
  }
  getPostRem() {
    return this.ms.allPost({'user_key': this.user_key,'start':this.start}).subscribe(
      data => {this.allPostTemp= data.data;this.start=data.last_id;  
        this.allPost=[...this.allPost, ...this.allPostTemp];
      },  
      error => this.error = error
    );   
  }
  getPost() {
    return this.ms.allPost({'user_key': this.user_key,'start':this.start}).subscribe(
      data => { this.allPostTemp=data.data; this.allPost= this.allPostTemp; this.start =data.last_id; 
      var finalObj = [...this.allPost, ...this.allPostTemp];delete this.allPost; this.allPost =finalObj; 
      },  
      error => this.error = error
    );    
  }

  follow(key: any) {
     this.router.navigate(['/mentee/profile/'+key]);
  }
  geturl(video:any){
   return this.ds.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/'+video);

  }
  getNextBatch(event:any){
   
   
    // if(event%50==1){this.getPostRem();}
    
  }
  
  showComment(post_key:string,i:number){
    var show =this.allPost[i].show_comment;
    if(show==true){this.allPost[i].show_comment=false } else{this.allPost[i].show_comment=true}
    this.allPost[i].show_more =true;
    return this.ms.allPostComment({'post_key': post_key}).subscribe(
      data => this.allPost[i].all_comment = data,  
      error => this.error = error
    ); 
  }

  moreComment(post_key:string,index:number){
 
    this.allPost[index].comment_limit += 1;
  }
  
}
