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
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import {
  MatFormFieldModule,
  MatInputModule,
  MatTable,
  MatTableModule
} from "@angular/material";
import { ReactiveFormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { FooterComponent } from "./footer/footer.component";
import { MatButtonModule, MatButton } from "@angular/material/button";
import { UserModule } from "./user/user.module";
import { httpInterceptorProviders } from "./Interceptors";
import { PictoAgendaComponent } from "./picto-agenda/picto-agenda.component";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatExpansionModule } from "@angular/material/expansion";
import { CommonModule } from "@angular/common";
import { MatDividerModule, MatDivider } from "@angular/material/divider";
import { HttpClientModule } from "@angular/common/http";
import { FlexLayoutModule } from "@angular/flex-layout";
import { WorkDayDataService } from "./workDay.data.service";
import { WeekScheduleComponent } from "./week-schedule/week-schedule.component";
import { DayOfWeekComponent } from "./picto-agenda/day-of-week/day-of-week.component";
import { DayOfWeekendComponent } from "./picto-agenda/day-of-weekend/day-of-weekend.component";
import { AlgemeenWeekScheduleComponent } from "./week-schedule/algemeen-week-schedule/algemeen-week-schedule.component";
import { VoormiddagWeekScheduleComponent } from "./week-schedule/voormiddag-week-schedule/voormiddag-week-schedule.component";
import { NamiddagWeekScheduleComponent } from "./week-schedule/namiddag-week-schedule/namiddag-week-schedule.component";
import { ExtraWeekScheduleComponent } from "./week-schedule/extra-week-schedule/extra-week-schedule.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent,
    NavComponent,
    FooterComponent,
    WeekScheduleComponent,
    PictoAgendaComponent,
    DayOfWeekComponent,
    DayOfWeekendComponent,
    AlgemeenWeekScheduleComponent,
    VoormiddagWeekScheduleComponent,
    NamiddagWeekScheduleComponent,
    ExtraWeekScheduleComponent
  ],
  imports: [
    FlexLayoutModule,
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
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [httpInterceptorProviders, WorkDayDataService],
  bootstrap: [AppComponent]
})
export class AppModule {}
