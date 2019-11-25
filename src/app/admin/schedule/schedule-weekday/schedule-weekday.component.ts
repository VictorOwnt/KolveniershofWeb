import {Component, Inject, Input, LOCALE_ID, OnInit} from '@angular/core';
import {Workday} from '../../../shared/models/workday.model';

@Component({
  selector: 'app-schedule-weekday',
  templateUrl: './schedule-weekday.component.html',
  styleUrls: ['./schedule-weekday.component.scss']
})
export class ScheduleWeekdayComponent implements OnInit {
  @Input() workday: Workday;

  constructor() {}

  ngOnInit() {}

  newUnit(type: string, isAm: boolean = null) {
    // TODO
  }

}
