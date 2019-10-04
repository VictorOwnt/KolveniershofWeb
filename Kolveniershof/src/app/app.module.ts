import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { MatMenuModule } from "@angular/material/menu";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./user/login/login.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatIconModule } from "@angular/material/icon";
import { NavComponent } from "./nav/nav.component";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatFormFieldModule, MatInputModule } from "@angular/material";
import { ReactiveFormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { FooterComponent } from "./footer/footer.component";
import { MatButtonModule, MatButton } from "@angular/material/button";
import { UserModule } from "./user/user.module";
import { httpInterceptorProviders } from "./Interceptors";
import { WeekScheduleComponent } from "./week-schedule/week-schedule.component";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatExpansionModule } from "@angular/material/expansion";
import { CommonModule } from "@angular/common";
import { MatDividerModule, MatDivider } from "@angular/material/divider";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent,
    NavComponent,
    FooterComponent,
    WeekScheduleComponent
  ],
  imports: [
    MatDividerModule,
    CommonModule,
    MatExpansionModule,
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    UserModule,
    HttpClientModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {}
