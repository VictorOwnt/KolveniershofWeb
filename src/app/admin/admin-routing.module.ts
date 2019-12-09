import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from '../authentication/auth.guard';
import {AdminComponent} from './admin.component';
import {AdminActivitiesComponent} from './admin-activities/admin-activities.component';
import {AdminBussesComponent} from './admin-busses/admin-busses.component';
import {AdminGuard} from '../authentication/admin.guard';

const routes: Routes = [ // TODO - AuthGuard
  { path: '', component: AdminComponent, canActivate: [AdminGuard, AuthGuard] },
  { path: 'activities', component: AdminActivitiesComponent, canActivate: [AdminGuard, AuthGuard] },
  { path: 'busses', component: AdminBussesComponent, canActivate: [AdminGuard, AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
