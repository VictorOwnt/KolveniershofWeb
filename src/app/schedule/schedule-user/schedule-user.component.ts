import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Workday} from "../../models/workday.model";
import {DatesService} from "../../services/dates.service";
import {WorkdayDataService} from "../../services/workday.data.service";
import {AuthenticationService} from "../../authentication/authentication.service";

@Component({
  selector: 'app-schedule-user',
  templateUrl: './schedule-user.component.html',
  styleUrls: ['./schedule-user.component.scss']
})
export class ScheduleUserComponent implements OnInit {

  workdays$: Observable<Workday[]>;
  dates: Date[] = [];
  private date: Date = new Date();

  constructor(
      public datesService: DatesService,
      private workdayDataService: WorkdayDataService,
      private auth: AuthenticationService
  ) {
    this.loadWorkdays(this.date);
  }

  ngOnInit() {
  }

  // Load all workdays based on day in week
  private loadWorkdays(date: Date) {
    // Get all days in week for today's week
    this.dates = this.datesService.weekDays(date);
    // Get all workdays for this week
    this.workdays$ = this.workdayDataService.getWorkdaysByWeekByUser(this.dates[0], this.auth.currentUser);
    console.log(this.workdays$)
  }

  // Load next week
  nextWeek() {
    this.date = this.datesService.addWeek(this.date);
    this.loadWorkdays(this.date);
  }

  // Load previous week
  prevWeek() {
    this.date = this.datesService.subtractWeek(this.date);
    this.loadWorkdays(this.date);
  }

}
