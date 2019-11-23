import { Component, OnInit } from '@angular/core';
import {Workday} from '../../shared/models/workday.model';
import {WorkDayDataService} from '../../services/workDay.data.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  private workdays: any[] | Workday[] = [];

  constructor(private workdayDataService: WorkDayDataService) {
    // TODO - real data
  }

  ngOnInit() {
  }

}
