import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from 'src/app/authentication/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PictoAgendaComponent } from './picto-agenda/picto-agenda.component';
import { AuthGuard } from './authentication/auth.guard';
import { RegisterComponent } from './authentication/register/register.component';
import { AdminBussesComponent } from './admin/admin-busses/admin-busses.component';
import { AdminActivitiesComponent } from './admin/admin-activities/admin-activities.component';
import {ForbiddenComponent} from './authentication/forbidden/forbidden.component';
import {AdminGuard} from './authentication/admin.guard';

const appRoutes: Routes = [
  {
    path: 'schedule',
    loadChildren: () => import('./schedule/schedule.module').then(mod => mod.ScheduleModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(mod => mod.AdminModule),
    canActivate: [AdminGuard, AuthGuard]
  },
  // TODO - Fix all routes
  { path: 'login', component: LoginComponent },
  { path: 'home', component: PictoAgendaComponent },
  { path: 'bus', component: AdminBussesComponent },
  { path: 'picto', component: PictoAgendaComponent, canActivate: [AuthGuard] },
  { path: 'r', component: RegisterComponent },
  { path: 'a', component: AdminActivitiesComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes), CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule {}
