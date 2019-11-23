import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from 'src/app/user/login/login.component';

import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PictoAgendaComponent } from './picto-agenda/picto-agenda.component';
import { AuthGuard } from './user/auth.guard';
import { BusschemaComponent } from './busschema/busschema.component';
import {RegisterComponent} from './user/register/register.component';
import {AdminHomeComponent} from './admin-home/admin-home.component';
import {ScheduleComponent} from './admin/schedule/schedule.component';

const appRoutes: Routes = [ // TODO - Fix all routes
  { path: 's', component: ScheduleComponent },
  { path: 'admin', component: AdminHomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: PictoAgendaComponent },
  { path: 'bus', component: BusschemaComponent },
  { path: 'picto', component: PictoAgendaComponent, canActivate: [AuthGuard] },
  { path: 'r', component: RegisterComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes), CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule {}
