import {Component, Input, OnInit} from '@angular/core';
import {Workday} from '../models/workday.model';

@Component({
  selector: 'app-holiday',
  templateUrl: './holiday.component.html',
  styleUrls: ['./holiday.component.scss']
})
export class HolidayComponent implements OnInit {
  @Input() public weekDay: Workday;

  constructor() { }

  ngOnInit() {
  }

}
