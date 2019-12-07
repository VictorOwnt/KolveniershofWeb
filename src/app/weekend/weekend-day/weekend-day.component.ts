import {Component, Input, OnInit} from '@angular/core';
import {Workday} from '../../models/workday.model';

@Component({
  selector: 'app-weekend-day',
  templateUrl: './weekend-day.component.html',
  styleUrls: ['./weekend-day.component.scss']
})
export class WeekendDayComponent implements OnInit {
  @Input() public weekDay: Workday;

  constructor() { }

  ngOnInit() {
  }

}
