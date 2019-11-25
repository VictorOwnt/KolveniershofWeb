// everything still has to be put in seperate modules
import { BrowserModule } from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './user/login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from './header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  MatFormFieldModule,
  MatInputModule,
  MatNativeDateModule,
  MatDialogModule, MatCheckboxModule
} from '@angular/material';
import { MatListModule } from '@angular/material/list';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { FooterComponent } from './footer/footer.component';
import { MatButtonModule } from '@angular/material/button';
import { UserModule } from './user/user.module';
import { httpInterceptorProviders } from './http-interceptors';
import { PictoAgendaComponent } from './picto-agenda/picto-agenda.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule } from '@angular/material/expansion';
import {CommonModule, DatePipe, registerLocaleData} from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { WorkDayDataService } from './services/workDay.data.service';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { BusschemaComponent } from './busschema/busschema.component';
import { MatSelectModule } from '@angular/material/select';
import { RegisterComponent } from './user/register/register.component';
import { BusschemaTableComponent } from './busschema/busschema-table/busschema-table.component';
import { WeekdayComponent } from './weekday/weekday.component';
import { ActivityComponent } from './weekday/activity/activity.component';
import { WeekendComponent } from './weekend/weekend.component';
import { WeekendDayComponent } from './weekend/weekend-day/weekend-day.component';
import { HolidayComponent } from './holiday/holiday.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule} from '@angular/fire/storage';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { environment } from '../environments/environment';
import { ScheduleComponent } from './admin/schedule/schedule.component';
import { ScheduleWeekdayComponent } from './admin/schedule/schedule-weekday/schedule-weekday.component';
import { ScheduleUnitComponent } from './admin/schedule/schedule-unit/schedule-unit.component';
import localeNl from '@angular/common/locales/nl';
import { ScheduleWeekendComponent } from './admin/schedule/schedule-weekend/schedule-weekend.component';

registerLocaleData(localeNl, 'nl-BE');

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent,
    HeaderComponent,
    FooterComponent,
    PictoAgendaComponent,
    BusschemaComponent,
    RegisterComponent,
    BusschemaTableComponent,
    WeekdayComponent,
    ActivityComponent,
    WeekendComponent,
    WeekendDayComponent,
    HolidayComponent,
    AdminHomeComponent,
    ScheduleComponent,
    ScheduleWeekdayComponent,
    ScheduleUnitComponent,
    ScheduleWeekendComponent
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
    FontAwesomeModule,
    MatListModule,
    ScrollingModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    FormsModule,
    MatSelectModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    MatCheckboxModule
  ],
  entryComponents: [],
  providers: [
    { provide: LOCALE_ID, useValue: 'nl-BE' },
    httpInterceptorProviders,
    DatePipe,
    WorkDayDataService,
    MatDatepickerModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
