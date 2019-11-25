import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Activity} from '../../shared/models/activity.model';
import {ActivityDataService} from '../../services/activity.data.service';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.scss']
})
export class ActivityListComponent implements OnInit {
  private _fetchActivities$: Observable<Activity[]> = this._activityDataService.activities$;
  private _activities: Activity[];
  constructor(
      private _activityDataService: ActivityDataService
  ) {
    this._fetchActivities$.subscribe(activities => (this._activities = activities));
  }

  ngOnInit() {
  }

  get activities$(): Observable<Activity[]> {
    return this._fetchActivities$;
  }

  delete(id: String): void {
    this._activityDataService.deleteActivity(id);
  }

}
