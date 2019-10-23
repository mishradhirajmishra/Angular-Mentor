import { BrowserModule ,Title} from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ManteeModule } from "./mantee/mantee.module";
import { MantorModule } from "./mantor/mantor.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule,HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AboutComponent } from './about/about.component';
import { NewsComponent } from './news/news.component';
import { EventsComponent } from './events/events.component';
import { ContactComponent } from './contact/contact.component';
import { BabaValuatorComponent } from './baba-valuator/baba-valuator.component';
import { AuthGuard } from './auth.guard';
import { ManteeAuthGuard} from "./mantee/mantee-auth.guard";
import { MantorAuthGuard } from "./mantor/mantor-auth.guard";
import { TokenInterceptorService } from "./token-interceptor.service";
import { NgxPaginationModule } from 'ngx-pagination';
import { ProfileComponent } from './profile/profile.component';
import { PitchitComponent } from './pitchit/pitchit.component';
import { BabaincComponent } from './babainc/babainc.component';
import { BabastartComponent } from './babastart/babastart.component';
import { AdminGuard } from './admin/admin.guard';
import { AdminModule } from './admin/admin.module';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    PageNotFoundComponent,
    LoginComponent,
    RegisterComponent,
    AboutComponent,
    NewsComponent,
    EventsComponent,
    ContactComponent,
    BabaValuatorComponent,
    ProfileComponent,
    PitchitComponent,
    BabaincComponent,
    BabastartComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    ManteeModule,
    MantorModule,
    AdminModule,
    NgxPaginationModule,
    AppRoutingModule,

  
  ],
  providers: [Title,AuthGuard,ManteeAuthGuard,MantorAuthGuard,AdminGuard,{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
