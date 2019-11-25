import {Component, Input, OnInit} from '@angular/core';
import {Workday} from '../../../shared/models/workday.model';

@Component({
  selector: 'app-schedule-weekend',
  templateUrl: './schedule-weekend.component.html',
  styleUrls: ['./schedule-weekend.component.scss']
})
export class ScheduleWeekendComponent implements OnInit {
  @Input() workday: Workday;

  constructor() { }

  ngOnInit() { }

  viewComments() {
    // TODO
  }

}
