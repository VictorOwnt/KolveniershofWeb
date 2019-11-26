import { Component, OnInit } from '@angular/core';
import {Workday} from '../../shared/models/workday.model';
import {WorkdayDataService} from '../../services/workday.data.service';
import {DatesService} from '../../services/dates.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  workdays: Observable<Workday[]>;
  dates: Date[] = [];
  private date: Date = new Date();

  constructor(public datesService: DatesService, private workdayDataService: WorkdayDataService) {
    this.loadWorkdays(this.date);
  }

  ngOnInit() {
  }

  // Load all workdays based on day in week
  private loadWorkdays(date: Date) {
    // Get all days in week for today's week
    this.dates = this.datesService.weekDays(date);
    // Get all workdays for this week
    this.workdays = this.workdayDataService.getWorkdaysByWeek(this.dates[0]);
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
