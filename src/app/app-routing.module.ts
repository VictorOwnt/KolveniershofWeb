import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from 'src/app/authentication/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './authentication/auth.guard';
import { RegisterComponent } from './authentication/register/register.component';
import {ForbiddenComponent} from './authentication/forbidden/forbidden.component';

const appRoutes: Routes = [
  {
    path: 'schedule',
    loadChildren: () => import('./schedule/schedule.module').then(mod => mod.ScheduleModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(mod => mod.AdminModule),
    canActivate: [AuthGuard],
    data: { shouldBeAdmin: true }
  },
  { path: 'login', component: LoginComponent },
  { path: 'r', component: RegisterComponent },
  { path: '', component: PageNotFoundComponent, canActivate: [AuthGuard] }, // See AuthGuard for homepage routing
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  { path: 'index', redirectTo: '', pathMatch: 'full' },
  { path: 'welcome', redirectTo: '', pathMatch: 'full' },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes), CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule {}
