import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MantorRoutingModule } from './mantor-routing.module';
import { RegisterMantorComponent } from './register-mantor/register-mantor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HelpComponent } from './help/help.component';


@NgModule({
  declarations: [RegisterMantorComponent, DashboardComponent, HelpComponent],
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    MantorRoutingModule
  ],
  exports :[RegisterMantorComponent]
})
export class MantorModule { }
