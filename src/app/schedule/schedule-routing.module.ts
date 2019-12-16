import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ScheduleAdminComponent} from './schedule-admin/schedule-admin.component';
import {AuthGuard} from '../authentication/auth.guard';
import {ScheduleUserComponent} from './schedule-user/schedule-user.component';
import {ScheduleTemplateComponent} from './schedule-template/schedule-template.component';

const routes: Routes = [
  {path: '', component: ScheduleAdminComponent, canActivate: [AuthGuard], data: {shouldBeAdmin: true}},
  {path: 'client', component: ScheduleUserComponent, canActivate: [AuthGuard]},
  {path: 'client/:clientId', component: ScheduleUserComponent, canActivate: [AuthGuard], data: {shouldBeAdmin: true}},
  {path: 'template/:templateName', component: ScheduleTemplateComponent, canActivate: [AuthGuard], data: {shouldBeAdmin: true}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScheduleRoutingModule {
}
