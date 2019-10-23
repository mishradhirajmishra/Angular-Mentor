import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ManteeService } from '../../mantee.service';
import { FormBuilder, Validators, NgForm } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';


@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
  theCheckbox:boolean;
  helper = new JwtHelperService();
  lengthMsg: string;
  error: {};
 cat=[];
  user_key: any;
  model: any;
  imgfile: {};
  allIntrest: any;
  token: string;
  submited: boolean = false;
  constructor(public router: Router, private fb: FormBuilder, private ms: ManteeService) {  }
  get videoUrl() {return this.userPost.get('video'); }
  get description() {return this.userPost.get('description'); }
  userPost = this.fb.group({
    video: [''],
    description: ['', Validators.required]
  });
  ngOnInit() {
    this.token = localStorage.getItem('token');
    this.token = this.helper.decodeToken(this.token);
    this.user_key = this.token['unique_key'];
    this.ms.allIntrestareaforPost({ 'user_key': this.user_key }).subscribe(
      data => { this.allIntrest = data;},
      error => this.error = error
    );

  }

  formData = new FormData();
  onSelectChange(event: any) {
    this.imgfile = <File>event.target.files;
    var length = event.target.files.length;
    if (length) {
      var i;
      for (i = 0; i < length; i++) {
        this.formData.append('photo' + (i + 1), this.imgfile[i], this.imgfile[i].name)

      }
      if (length > 4) { this.lengthMsg = "Maximum  four image can be uploaded " } else {
        this.lengthMsg = length + "- image selected "
      }
      this.formData.append('img_count', length);
    }
    // =============================


  }
  returncode(){

  }

  addPost() {
    for(var x = 0; x < this.allIntrest.length; x++) {
      if(this.allIntrest[x].value==true)
      { this.cat.push(x+1);}         
  } 
  var str =this.userPost.value.video;
  var n = str.indexOf("=");
    var res = str.substr(n+1);
    this.formData.append('category', JSON.stringify(this.cat));
    this.formData.append('user_key', this.user_key);
    this.formData.append('video', res);
    this.formData.append('description', this.userPost.value.description);
    return this.ms.addPost(this.formData).subscribe(
      data => {
      this.model = data; this.submited = true;
        this.userPost.patchValue({ video: '', description: '' });
        this.ngOnInit();
      },
      error => this.error = error
    );
  }
}
