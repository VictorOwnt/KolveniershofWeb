import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminComponent} from './admin.component';
import {AdminActivitiesComponent} from './admin-activities/admin-activities.component';
import {AdminBussesComponent} from './admin-busses/admin-busses.component';
import {AdminGuard} from '../authentication/admin.guard';
import {AuthGuard} from '../authentication/auth.guard';

const routes: Routes = [
  { path: '', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'activities', component: AdminActivitiesComponent, canActivate: [AuthGuard] },
  { path: 'busses', component: AdminBussesComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
