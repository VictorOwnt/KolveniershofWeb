import {Component, Input, OnInit} from '@angular/core';
import {Workday} from '../../../shared/models/workday.model';
import { Observable } from 'rxjs';
import { FirebaseService } from 'src/app/services/firebase.service';
import { WorkdayDataService } from 'src/app/services/workday.data.service';

@Component({
  selector: 'app-schedule-weekend',
  templateUrl: './schedule-weekend.component.html',
  styleUrls: ['./schedule-weekend.component.scss']
})
export class ScheduleWeekendComponent implements OnInit {
  @Input() workday: Workday;
  icon: Observable<string | null>;

  constructor(
    private workdayDataService: WorkdayDataService,
    private firebaseService: FirebaseService) {}

  ngOnInit() {
    this.icon = this.firebaseService.lookupFileDownloadUrl(this.workdayDataService.getDayIcon(this.workday.date.getDay()), 'icon');
   }

  viewComments() {
    // TODO
  }

}
