import {Component, Input, OnInit} from '@angular/core';
import {Workday} from '../shared/models/workday.model';

@Component({
  selector: 'app-weekend',
  templateUrl: './weekend.component.html',
  styleUrls: ['./weekend.component.scss']
})
export class WeekendComponent implements OnInit {
  @Input() public weekDays: Workday[];
  constructor() { }

  ngOnInit() {
  }

}
