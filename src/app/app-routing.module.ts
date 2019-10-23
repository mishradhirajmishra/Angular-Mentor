import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NewsComponent } from './news/news.component';
import { EventsComponent } from './events/events.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { BabaValuatorComponent } from './baba-valuator/baba-valuator.component';
import { PitchitComponent } from './pitchit/pitchit.component';
import { ProfileComponent } from './profile/profile.component';
import { BabaincComponent } from './babainc/babainc.component';
import { BabastartComponent } from './babastart/babastart.component';


const routes: Routes = [
  {path:'', redirectTo:'',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'news',component:NewsComponent},
  {path:'babainc',component:BabaincComponent},
  {path:'babastart',component:BabastartComponent},
  {path:'events',component:EventsComponent},
  {path:'about',component:AboutComponent},
  {path:'contact',component:ContactComponent},
  {path:'babavaluator',component:BabaValuatorComponent},
  {path:'profile',component:ProfileComponent},
  {path:'pitchit',component:PitchitComponent},
  // {path:'**',component:PageNotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
