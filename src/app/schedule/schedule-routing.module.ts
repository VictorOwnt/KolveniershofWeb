import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ScheduleAdminComponent} from './schedule-admin/schedule-admin.component';
import {AuthGuard} from '../authentication/auth.guard';

const routes: Routes = [
  { path: '', component: ScheduleAdminComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScheduleRoutingModule { }
