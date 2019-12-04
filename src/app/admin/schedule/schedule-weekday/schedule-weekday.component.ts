import {Component, Inject, Input, LOCALE_ID, OnInit} from '@angular/core';
import {Workday} from '../../../shared/models/workday.model';
import {WorkdayDataService} from '../../../services/workday.data.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-schedule-weekday',
  templateUrl: './schedule-weekday.component.html',
  styleUrls: ['./schedule-weekday.component.scss']
})
export class ScheduleWeekdayComponent implements OnInit {
  @Input() workday: Workday;
  icon: Observable<string | null>;

  constructor(
    private workdayDataService: WorkdayDataService,
    private firebaseService: FirebaseService
    ) {}

  ngOnInit() {
    this.icon = this.firebaseService.lookupFileDownloadUrl(this.workdayDataService.getDayIcon(this.workday.date.getDay()), 'icon');
  }

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
