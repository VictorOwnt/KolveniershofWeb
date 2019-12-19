import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from './admin.component';
import {AdminActivitiesComponent} from './admin-activities/admin-activities.component';
import {AdminBussesComponent} from './admin-busses/admin-busses.component';
import {AuthGuard} from '../authentication/auth.guard';
import {AdminTemplatesComponent} from './admin-templates/admin-templates.component';
import {AdminUsersComponent} from './admin-users/admin-users.component';

const routes: Routes = [
  {path: '', component: AdminComponent, canActivate: [AuthGuard], data: {shouldBeAdmin: true}},
  {path: 'activities', component: AdminActivitiesComponent, canActivate: [AuthGuard], data: {shouldBeAdmin: true}},
  {path: 'busses', component: AdminBussesComponent, canActivate: [AuthGuard], data: {shouldBeAdmin: true}},
  {path: 'templates', component: AdminTemplatesComponent, canActivate: [AuthGuard], data: {shouldBeAdmin: true}},
  {path: 'users', component: AdminUsersComponent, canActivate: [AuthGuard], data: {shouldBeAdmin: true}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
