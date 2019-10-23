import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { ManteeService } from '../mantee.service';
import { JwtHelperService } from '@auth0/angular-jwt';



@Component({
  selector: 'app-pitchit',
  templateUrl: './pitchit.component.html',
  styleUrls: ['./pitchit.component.css']
})
export class PitchitComponent implements OnInit {
  helper = new JwtHelperService();
  user_key: String;
  notsubmited = true;
  model: any;
  token: string;
  focusArea: any;
  manteeProfileExplist: any;
  manteeProfileEdulist: any;
  formhide = true;
  error: {};
  proid:string;
  get projname() {
    return this.projects.get('projName');
  }
  get emailr() {
    return this.projects.get('email');
  }
  get projectarea() {
    return this.projects.get('projectArea');
  }
  get projurl() {
    return this.projects.get('projUrl');
  }
  get terms() {
    return this.projects.get('term');
  }


  projects = this.fb.group({
    projName: ['', Validators.required],
    projUrl: ['', Validators.pattern('https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}')],
    email: ['', [Validators.required, Validators.email]],
    projectArea: ['1', Validators.required],
    problum: [''],
    solution: [''],
    marketOpp: [''],
    competitiveLand: [''],
    marketStr: [''],
    customerStr: [''],
    financialMod: [''],
    misc: [''],
    term: ['', Validators.required],
  });
  constructor(public router: Router, private fb: FormBuilder, private ms: ManteeService, private actroute: ActivatedRoute) { }

  ngOnInit() {
    this.token = localStorage.getItem('token');
    this.token = this.helper.decodeToken(this.token);
    this.user_key = this.token['unique_key'];
    this.ms.projectFocusArea().subscribe(
      data => this.focusArea = data,
      error => this.error = error
    );
    this.actroute.paramMap.subscribe(params => {
      this.proid=params.get('id');

    })
    if(this.proid){
      this.ms.projectByKey({'user_key':this.user_key, 'pro_key': this.proid, }).subscribe(
        data => { this.model = data;this.projects.patchValue(this.model) },
        error => this.error = error
      );
      
    }
  }

  addProjects() {
    this.notsubmited = false;
    return this.ms.addProject({'pro_key': this.proid, 'submited': 'true', 'user_key': this.user_key, 'data': this.projects.value }).subscribe(
      data => { this.model = data; },
      error => this.error = error
    );
  }
  draft() {
    this.notsubmited = false;
    return this.ms.addProject({ 'pro_key': this.proid,'submited': 'false', 'user_key': this.user_key, 'data': this.projects.value }).subscribe(
      data => { this.model = data; },
      error => this.error = error
    );
  }
  gotoDashboard() {
    this.router.navigate(['/mentee/dasboard'])
  }
}
