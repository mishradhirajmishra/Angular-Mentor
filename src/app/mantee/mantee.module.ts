import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManteeRoutingModule } from './mantee-routing.module';
import { RegisterManteeComponent } from './register-mantee/register-mantee.component';
import { IntrestAreaComponent } from './intrest-area/intrest-area.component';
import { PitchitComponent } from './pitchit/pitchit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MeetingComponent } from './meeting/meeting.component';
import { ConversationComponent } from './conversation/conversation.component';
import { AccountComponent } from './account/account.component';
import { ProfileComponent } from './profile/profile.component';
import { GetFirstWord } from "../custom_pipe/firstchar.pipe";
import { Submited } from "../custom_pipe/submited.pipe";
import { DataById } from "../custom_pipe/data.pipe";
import { SearchPipe } from "../custom_pipe/search.pipe";
import {NgxPaginationModule} from 'ngx-pagination';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ManageComponent } from './meeting/manage/manage.component';
import { UpcomingComponent } from './meeting/upcoming/upcoming.component';
import { TimeSlotComponent } from './meeting/time-slot/time-slot.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { PitchitDatailComponent } from './pitchit-datail/pitchit-datail.component';
import {ScrollDispatchModule} from '@angular/cdk/scrolling';
import { AddPostComponent } from './dashboard/add-post/add-post.component';
import { ListPostComponent } from './dashboard/list-post/list-post.component';
import { ListMentorComponent } from './dashboard/list-mentor/list-mentor.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { ProfileDetailComponent } from './profile-detail/profile-detail.component';
import { ReqMeetingComponent } from './req-meeting/req-meeting.component';
import { ConferencComponent } from './conferenc/conferenc.component';
import { ContactComponent } from './conversation/contact/contact.component';
import { ChatComponent } from './conversation/chat/chat.component';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { AlluserComponent } from './alluser/alluser.component';
import { FoolowerComponent } from './foolower/foolower.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { NotificationComponent } from './notification/notification.component';
import { FindMentorComponent } from './find-mentor/find-mentor.component';
import { BabastartinComponent } from './babastartin/babastartin.component';
import { ImageCropperModule } from 'ngx-image-cropper';


@NgModule({
  declarations: [
    RegisterManteeComponent,
    IntrestAreaComponent,
    PitchitComponent,
    SidebarComponent,
    DashboardComponent,
    MeetingComponent,
    ConversationComponent,
    AccountComponent,
    ProfileComponent,
    GetFirstWord,
    DataById,
    SearchPipe,
    Submited,
    ProjectDetailComponent,
    ManageComponent,
    UpcomingComponent,
    TimeSlotComponent,
    PitchitDatailComponent,
    AddPostComponent,
    ListPostComponent,
    ListMentorComponent,
    SearchBarComponent,
    ProfileDetailComponent,
    ReqMeetingComponent,
    ConferencComponent,
    ContactComponent,
    ChatComponent,
    AlluserComponent,
    FoolowerComponent,
    SearchResultComponent,
    NotificationComponent,
    FindMentorComponent,
    BabastartinComponent 
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    OwlDateTimeModule, 
    ImageCropperModule,
    OwlNativeDateTimeModule ,
    ReactiveFormsModule,    
    NgxPaginationModule,
    ScrollDispatchModule,
    FilterPipeModule,
    BrowserAnimationsModule,
    ManteeRoutingModule,
 
  ], exports: [RegisterManteeComponent,SidebarComponent],

})
export class ManteeModule { }
