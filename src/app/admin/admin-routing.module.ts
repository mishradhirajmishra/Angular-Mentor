import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminGuard } from './admin.guard';
import { IntrestareaComponent } from './intrestarea/intrestarea.component';
import { StartupareaComponent } from './startuparea/startuparea.component';
import { EdudropdownComponent } from './edudropdown/edudropdown.component';
import { ExpdropdownComponent } from './expdropdown/expdropdown.component';
import { AlluserComponent } from './alluser/alluser.component';
import { ProjfocusComponent } from './projfocus/projfocus.component';
import { AllprojComponent } from './allproj/allproj.component';
import { ProfileDetailComponent } from '../mantee/profile-detail/profile-detail.component';
import { ManteeAuthGuard } from '../mantee/mantee-auth.guard';
import { ProjectDetailComponent } from '../mantee/project-detail/project-detail.component';
import { FoolowerComponent } from '../mantee/foolower/foolower.component';
import { AccountComponent } from '../mantee/account/account.component';
import { AdminHelpareaComponent } from './admin-helparea/admin-helparea.component';
import { AdminSubHelpareaComponent } from './admin-sub-helparea/admin-sub-helparea.component';
import { PostComponent } from './post/post.component';
import { MeetingComponent } from './meeting/meeting.component';
import { SubscribserComponent } from './subscribser/subscribser.component';
import { BabstartAdminComponent } from './babstart-admin/babstart-admin.component';
import { AnalyticsComponent } from './analytics/analytics.component';

const routes: Routes = [
  {path:'admin/dasboard',component:DashboardComponent,canActivate:[AdminGuard]},
  {path:'admin/analytics',component:AnalyticsComponent,canActivate:[AdminGuard]},
  {path:'admin/contact',component:BabstartAdminComponent,canActivate:[AdminGuard]},
  {path:'admin/intrestarea',component:IntrestareaComponent,canActivate:[AdminGuard]},
  {path:'admin/startuparea',component: StartupareaComponent,canActivate:[AdminGuard]},
  {path:'admin/experience',component:ExpdropdownComponent,canActivate:[AdminGuard]},
  {path:'admin/education',component:EdudropdownComponent,canActivate:[AdminGuard]},
  {path:'admin/alluser',component:AlluserComponent,canActivate:[AdminGuard]},
  {path:'admin/allproject',component:AllprojComponent,canActivate:[AdminGuard]},
  {path:'admin/allproject/:id',component:AllprojComponent,canActivate:[AdminGuard]},
  {path:'admin/project-focus',component:ProjfocusComponent,canActivate:[AdminGuard]},
  {path:'admin/profile/:id',component:ProfileDetailComponent,canActivate:[ManteeAuthGuard]},
  {path:'admin/project-detail/:id',component:ProjectDetailComponent,canActivate:[ManteeAuthGuard]},
  {path:'admin/follower/:id',component:FoolowerComponent,canActivate:[ManteeAuthGuard]},
  {path:'admin/account',component:AccountComponent,canActivate:[ManteeAuthGuard]},
  {path:'admin/helparea',component:AdminHelpareaComponent,canActivate:[AdminGuard]},
  {path:'admin/subhelparea',component:AdminSubHelpareaComponent,canActivate:[AdminGuard]},
  {path:'admin/meeting',component:MeetingComponent,canActivate:[AdminGuard]},
  {path:'admin/posts',component:PostComponent,canActivate:[AdminGuard]},
  {path:'admin/subscriber',component:SubscribserComponent,canActivate:[AdminGuard]},
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
