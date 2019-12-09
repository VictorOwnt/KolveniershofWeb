import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ScheduleComponent} from './schedule.component';
import {AuthGuard} from '../authentication/auth.guard';

const routes: Routes = [
  { path: '', component: ScheduleComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScheduleRoutingModule { }
