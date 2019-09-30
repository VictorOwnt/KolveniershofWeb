import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "../../components/login/login.component";

import { RouterModule, Routes } from "@angular/router";

const appRoutes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "home", component: LoginComponent },
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "**", component: LoginComponent }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes), CommonModule],
  exports: [RouterModule]
})
export class RoutingModule { }
