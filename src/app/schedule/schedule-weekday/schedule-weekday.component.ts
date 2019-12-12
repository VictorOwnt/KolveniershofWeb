import {Component, Input, OnInit} from '@angular/core';
import {Workday} from '../../models/workday.model';
import {WorkdayDataService} from '../../services/workday.data.service';
import {FirebaseService} from 'src/app/services/firebase.service';
import {Observable} from 'rxjs';
import {WorkdayTemplate} from '../../models/workdayTemplate.model';
import {WorkdayTemplateDataService} from '../../services/workdayTemplate.data.service';

@Component({
  selector: 'app-schedule-weekday',
  templateUrl: './schedule-weekday.component.html',
  styleUrls: ['./schedule-weekday.component.scss']
})
export class ScheduleWeekdayComponent implements OnInit {
  @Input() workday: Workday | WorkdayTemplate;
  @Input() isAdmin: boolean;
  isTemplate: boolean;
  icon: Observable<string | null>;

  constructor(
    private workdayDataService: WorkdayDataService,
    private workdayTemplateDataService: WorkdayTemplateDataService,
    private firebaseService: FirebaseService
  ) {
  }

  ngOnInit() {
    if (this.workday instanceof Workday) {
      this.isTemplate = false;
      this.icon = this.firebaseService
        .lookupFileDownloadUrl(this.workdayDataService.getDayIcon(this.workday.date.getDay()), 'icon');
    } else if (this.workday instanceof WorkdayTemplate) {
      this.isTemplate = true;
      this.icon = this.firebaseService
        .lookupFileDownloadUrl(this.workdayTemplateDataService.getDayIcon(this.workday.dayNumber), 'icon');
    }
  }

  newUnit(type: string, isAm: boolean = null) {
    // TODO
  }

  changeHoliday(holiday: boolean) {
    this.workday.holiday = holiday;
    if (this.isTemplate) {
      this.workdayTemplateDataService.patchWorkdayTemplate(this.workday as WorkdayTemplate);
    } else {
      this.workdayDataService.patchWorkday(this.workday as Workday);
    }
  }

  viewComments() {
    // TODO
  }

}
