import {Component, Inject, Input, LOCALE_ID, OnInit} from '@angular/core';
import {Workday} from '../../../shared/models/workday.model';
import {WorkdayDataService} from '../../../services/workday.data.service';

@Component({
  selector: 'app-schedule-weekday',
  templateUrl: './schedule-weekday.component.html',
  styleUrls: ['./schedule-weekday.component.scss']
})
export class ScheduleWeekdayComponent implements OnInit {
  @Input() workday: Workday;

  constructor(private workdayDataService: WorkdayDataService) {}

  ngOnInit() {}

  newUnit(type: string, isAm: boolean = null) {
    // TODO
  }

  changeHoliday(holiday: boolean) {
    this.workday.holiday = holiday;
    // TODO - this.workdayDataService.patchWorkday(this.workday);
  }

  viewComments() {
    // TODO
  }

}
