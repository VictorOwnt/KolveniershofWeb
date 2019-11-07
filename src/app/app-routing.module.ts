import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "src/app/user/login/login.component";

import { RouterModule, Routes } from "@angular/router";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { PictoAgendaComponent } from "./picto-agenda/picto-agenda.component";
import { WeekScheduleComponent } from "./week-schedule/week-schedule.component";
import { AuthGuard } from "./user/auth.guard";
import { BusschemaComponent } from "./busschema/busschema.component";

const appRoutes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "home", component: PictoAgendaComponent },
  { path: "bus", component: BusschemaComponent },
  { path: "week", component: WeekScheduleComponent, canActivate: [AuthGuard] }, //
  { path: "picto", component: PictoAgendaComponent, canActivate: [AuthGuard] },
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes), CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule {}
