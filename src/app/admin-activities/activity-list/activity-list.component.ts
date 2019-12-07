import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Activity} from '../../models/activity.model';
import {ActivityDataService} from '../../services/activity.data.service';
@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.scss']
})
export class ActivityListComponent implements OnInit {
  activities$: Observable<Activity[]>;

  constructor(private activityDataService: ActivityDataService) {
    this.activities$ = activityDataService.activities$;
  }
  ngOnInit() {
  }
  delete(id: string): void { // TODO - enkel delete bij 2 keer klikken
    this.activityDataService.deleteActivity(id).subscribe();
  }
}
