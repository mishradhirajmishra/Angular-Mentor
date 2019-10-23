import { NgModule } from '@angular/core';
import { Routes, RouterModule ,CanActivate} from '@angular/router';
import { RegisterMantorComponent } from './register-mantor/register-mantor.component';
import {DashboardComponent } from '../mantor/dashboard/dashboard.component';
import { MantorAuthGuard } from './mantor-auth.guard';
import { HelpComponent } from './help/help.component';


const routes: Routes = [
  {path:'mentor/register',component:RegisterMantorComponent},
  {path:'mentor/dasboard',component:DashboardComponent,canActivate:[MantorAuthGuard]},
  {path:'mentor/helpArea',component:HelpComponent,canActivate:[MantorAuthGuard]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MantorRoutingModule { }
