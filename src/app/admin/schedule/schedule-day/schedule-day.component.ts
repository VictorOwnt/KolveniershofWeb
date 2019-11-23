import {Component, Inject, Input, LOCALE_ID, OnInit} from '@angular/core';
import {Workday} from '../../../shared/models/workday.model';

@Component({
  selector: 'app-schedule-day',
  templateUrl: './schedule-day.component.html',
  styleUrls: ['./schedule-day.component.scss']
})
export class ScheduleDayComponent implements OnInit {
  @Input() workday: Workday;

  constructor() {}

  ngOnInit() {}

  newUnit(type: string, isAm: boolean = null) {
    // TODO
  }

}
