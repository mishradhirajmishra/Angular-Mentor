import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterManteeComponent } from './register-mantee/register-mantee.component';
import { PitchitComponent } from './pitchit/pitchit.component';

import { IntrestAreaComponent } from './intrest-area/intrest-area.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManteeAuthGuard} from '../mantee/mantee-auth.guard';
import { ConversationComponent } from './conversation/conversation.component';
import { MeetingComponent } from './meeting/meeting.component';
import { AccountComponent } from './account/account.component';
import { ProfileComponent } from './profile/profile.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ManageComponent } from './meeting/manage/manage.component';
import { TimeSlotComponent } from './meeting/time-slot/time-slot.component';
import { UpcomingComponent } from './meeting/upcoming/upcoming.component';
import { PitchitDatailComponent } from './pitchit-datail/pitchit-datail.component';
import { ProfileDetailComponent } from './profile-detail/profile-detail.component';
import { ReqMeetingComponent } from './req-meeting/req-meeting.component';
import { ContactComponent } from './conversation/contact/contact.component';
import { ChatComponent } from './conversation/chat/chat.component';
import { AlluserComponent } from './alluser/alluser.component';
import { FoolowerComponent } from './foolower/foolower.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { NotificationComponent } from './notification/notification.component';
import { FindMentorComponent } from './find-mentor/find-mentor.component';
import { BabastartinComponent } from './babastartin/babastartin.component';






const routes: Routes = [
  {path:'babastart/:id',component:BabastartinComponent,canActivate:[ManteeAuthGuard]},
  {path:'mentee/register',component:RegisterManteeComponent},
  {path:'mentee/dasboard',component:DashboardComponent,canActivate:[ManteeAuthGuard]},
  {path:'mentee/pitchit',component:PitchitComponent,canActivate:[ManteeAuthGuard]},
  {path:'mentee/pitchit-detail',component:PitchitDatailComponent,canActivate:[ManteeAuthGuard]},
  {path:'mentee/pitchit/:id',component:PitchitComponent,canActivate:[ManteeAuthGuard]},
  {path:'mentee/project-detail/:id',component:ProjectDetailComponent,canActivate:[ManteeAuthGuard]},
  {path:'mentee/req-meeting/:id',component:ReqMeetingComponent,canActivate:[ManteeAuthGuard]},
  {path:'mentee/intrestarea',component:IntrestAreaComponent,canActivate:[ManteeAuthGuard]},
  {path:'mentee/intrestarea',component:IntrestAreaComponent,canActivate:[ManteeAuthGuard]},
  {path:'mentee/all',component:AlluserComponent,canActivate:[ManteeAuthGuard]},
  {path:'mentee/follower/:id',component:FoolowerComponent,canActivate:[ManteeAuthGuard]},
  {path:'mentee/notification',component:NotificationComponent,canActivate:[ManteeAuthGuard]},
  {path:'mentee/saerch-result/:id',component:SearchResultComponent,canActivate:[ManteeAuthGuard]},
  {path:'mentor/find-mentor',component:FindMentorComponent,canActivate:[ManteeAuthGuard]},
  {path:'mentee/conversation',component:ConversationComponent,canActivate:[ManteeAuthGuard],
  children:[
    {path:'contact-list',component:ContactComponent,canActivateChild:[ManteeAuthGuard]},
    {path:'chat/:id',component:ChatComponent,canActivateChild:[ManteeAuthGuard],},
  ]},
  {path:'mentee/conversation/:id',component:ConversationComponent,canActivate:[ManteeAuthGuard]},
  {path:'mentee/account',component:AccountComponent,canActivate:[ManteeAuthGuard]},
  {path:'mentee/profile/:id',component:ProfileDetailComponent,canActivate:[ManteeAuthGuard]},
  {path:'mentee/myprofile',component:ProfileComponent,canActivate:[ManteeAuthGuard]},
  {path:'mentee/meeting',component:MeetingComponent,canActivate:[ManteeAuthGuard],
  children:[
    {path:'manage',component:ManageComponent,canActivateChild:[ManteeAuthGuard]},
    {path:'time-slot',component:TimeSlotComponent,canActivateChild:[ManteeAuthGuard],},
    {path:'upcoming',component:UpcomingComponent,canActivateChild:[ManteeAuthGuard]},

  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManteeRoutingModule { }
