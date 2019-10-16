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
import { WeekScheduleComponent } from "./week-schedule/week-schedule.component";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatExpansionModule } from "@angular/material/expansion";
import { CommonModule } from "@angular/common";
import { MatDividerModule, MatDivider } from "@angular/material/divider";
import { HttpClientModule } from "@angular/common/http";
import { FlexLayoutModule } from "@angular/flex-layout";
import { PictoAgendaComponent } from "./picto-agenda/picto-agenda.component";
import { DayOfWeekComponent } from "./week-schedule/day-of-week/day-of-week.component";
import { DayOfWeekendComponent } from "./week-schedule/day-of-weekend/day-of-weekend.component";
import { AlgemeenPictoAgendaComponent } from "./picto-agenda/algemeen-picto-agenda/algemeen-picto-agenda.component";
import { VoormiddagPictoAgendaComponent } from "./picto-agenda/voormiddag-picto-agenda/voormiddag-picto-agenda.component";
import { NamiddagPictoAgendaComponent } from "./picto-agenda/namiddag-picto-agenda/namiddag-picto-agenda.component";
import { ExtraPictoAgendaComponent } from "./picto-agenda/extra-picto-agenda/extra-picto-agenda.component";
import { WorkDayDataService } from "./workDay.data.service";

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
    AlgemeenPictoAgendaComponent,
    VoormiddagPictoAgendaComponent,
    NamiddagPictoAgendaComponent,
    ExtraPictoAgendaComponent
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
