import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "src/app/components/login/login.component";

import { RouterModule, Routes } from "@angular/router";
import { PageNotFoundComponent } from "src/app/components/page-not-found/page-not-found.component";

const appRoutes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "home", component: LoginComponent },
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes), CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule {}
