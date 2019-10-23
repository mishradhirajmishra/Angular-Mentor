import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IntrestareaComponent } from './intrestarea/intrestarea.component';
import { StartupareaComponent } from './startuparea/startuparea.component';
import { EdudropdownComponent } from './edudropdown/edudropdown.component';
import { ExpdropdownComponent } from './expdropdown/expdropdown.component';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import {FormsModule  } from "@angular/forms";
import { FilterPipeModule } from 'ngx-filter-pipe';
import { AlluserComponent } from './alluser/alluser.component';
import { ProjfocusComponent } from './projfocus/projfocus.component';
import { AllprojComponent } from './allproj/allproj.component';
import { AdminHelpareaComponent } from './admin-helparea/admin-helparea.component';
import { AdminSubHelpareaComponent } from './admin-sub-helparea/admin-sub-helparea.component';
import { MeetingComponent } from './meeting/meeting.component';
import { PostComponent } from './post/post.component';
import { SubscribserComponent } from './subscribser/subscribser.component';
import { BabstartAdminComponent } from './babstart-admin/babstart-admin.component';
import { AnalyticsComponent } from './analytics/analytics.component';

@NgModule({
  declarations: [
    DashboardComponent,
     IntrestareaComponent, 
     StartupareaComponent, 
     EdudropdownComponent,
      ExpdropdownComponent,
       AdminSidebarComponent,
       AlluserComponent,
       ProjfocusComponent,
       AllprojComponent,
       AdminHelpareaComponent,
       AdminSubHelpareaComponent,
       MeetingComponent,
       PostComponent,
       SubscribserComponent,
       BabstartAdminComponent,
       AnalyticsComponent 
      ],
  imports: [
    CommonModule,
    FormsModule,
    FilterPipeModule,
    AdminRoutingModule
  ],
  exports:[AdminSidebarComponent ]
})
export class AdminModule { }
