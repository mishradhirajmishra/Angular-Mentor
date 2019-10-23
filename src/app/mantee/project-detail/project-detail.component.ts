import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ManteeService } from '../mantee.service';
import { JwtHelperService } from '@auth0/angular-jwt';
// ======================

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {

  helper = new JwtHelperService();
  user_key: any;
  url:any;
  notsubmited = true;
  model: any;
  token: string;
  focusArea: any; 
  error: {};
  proid:string;
  imgfile:File;
  usertype:string;
  projImg:string;
  proviewlist:any;
  autharised:boolean=false;
  constructor(public router: Router, private ms: ManteeService, private actroute: ActivatedRoute) { }

  ngOnInit() {
    this.token =localStorage.getItem('token');
    this.token = this.helper.decodeToken(this.token);   
    this.user_key=this.token['unique_key'];    
    this.usertype=this.token['usertype'];  
    this.actroute.paramMap.subscribe(params => {
      this.proid=params.get('id');

    });
    this.ms.projectFocusArea().subscribe(
      data => this.focusArea = data,
      error => this.error = error
    );
     this.actroute.paramMap.subscribe(params => {
      this.proid=params.get('id');
    })
    if(this.proid){
      this.ms.projectByKey({ 'pro_key': this.proid, }).subscribe(
        data => { this.model = data;  },
        error => this.error = error
      );     
    }
    this.ms.getprojectImage({'pro_key':this.proid}).subscribe(
      data => {this.projImg=data},
      error => this.error = error
    );
   this.viewerList();
   
  }
viewerList(){
  this.ms.listViewOfProjectByProjectKey({'pro_key':this.proid}).subscribe(
    data => {this.proviewlist=data;
      if(this.proviewlist[0].proj_owner_key==this.user_key){this.autharised=true;}
    },
    error => this.error = error
  );
}
  gotoDashboard() {
    this.router.navigate(['/mentee/dasboard'])
  }
  onSelectChange(event:any){
    this.imgfile = <File>event.target.files[0]; 
    // ===============================
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
      
       this.url= (<FileReader>event.target).result;

      }
    }
  } 
  updateProfileImage(){ 
    const formData = new FormData();
    formData.append('user_key',this.user_key); 
    formData.append('pro_key',this.proid); 
    formData.append('data',this.imgfile,this.imgfile.name); 
    return this.ms.updateprojectImage(formData).subscribe(
      data => {this.model = data;this.ngOnInit()},
      error => this.error = error
    );         
  }
  allow(id:number,index:number,project_key:string,admin_key:string,user_key:string){    
    this.ms.updateViewOfProject({'id':id,'status':'1','project_key':project_key,'admin_key':admin_key,'user_key':user_key}).subscribe(
      data => {this.model = data;   this.viewerList();},
      error => this.error = error
    );    
  }
  disallow(id:number,index:number,project_key:string,admin_key:string,user_key:string){    
    this.ms.updateViewOfProject({'id':id,'status':'1','project_key':project_key,'admin_key':admin_key,'user_key':user_key}).subscribe(
      data => {this.model = data;   this.viewerList();},
      error => this.error = error
    );    
  }
}
