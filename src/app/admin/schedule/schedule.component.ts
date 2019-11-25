import { Component, OnInit } from '@angular/core';
import {Workday} from '../../shared/models/workday.model';
import {WorkdayDataService} from '../../services/workday.data.service';
import {DatesService} from '../../services/dates.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  workdays: Workday[] = [];
  dates: Date[] = [];
  private date: Date = new Date();

  constructor(private datesService: DatesService, private workdayDataService: WorkdayDataService) {
    this.loadWorkdays(this.date);
  }

  ngOnInit() {
  }

  // Load all workdays based on day in week
  private loadWorkdays(date: Date) {
    // Get all days in week for today's week
    this.dates = this.datesService.weekDays(date);
    // Get all workdays for this week
    this.workdayDataService.getWorkdaysByWeek(this.dates[0]).subscribe({
      next: (result: Workday[]) => { if (result) { this.workdays = result; } },
      error: (err: any) => { console.error(err); }
    });
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
