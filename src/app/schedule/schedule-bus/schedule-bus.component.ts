import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Workday} from '../../models/workday.model';
import {DatesService} from '../../services/dates.service';
import {WorkdayDataService} from '../../services/workday.data.service';
import {MatDialog} from '@angular/material/dialog';
import {ExportService} from '../../services/export.service';

@Component({
  selector: 'app-schedule-bus',
  templateUrl: './schedule-bus.component.html',
  styleUrls: ['./schedule-bus.component.scss']
})
export class ScheduleBusComponent implements OnInit {
  workdays$: Observable<Workday[]>;
  dates: Date[] = [];
  private date: Date = new Date();

  constructor(
    public datesService: DatesService,
    private workdayDataService: WorkdayDataService,
    public dialog: MatDialog,
    private exportService: ExportService
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
    this.workdays$ = this.workdayDataService.getWorkdaysByWeek(this.dates[0]);
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

  // Print week as PDF
  printWeek() {
    this.workdays$.subscribe(workdays => this.exportService.printWeek(workdays, true));
  }

}
