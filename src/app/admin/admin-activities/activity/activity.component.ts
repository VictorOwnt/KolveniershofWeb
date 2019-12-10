import {Component, Input, OnInit} from '@angular/core';
import {Activity} from '../../../models/activity.model';
import {AdminActivitiesComponent} from '../admin-activities.component';
import { Observable } from 'rxjs';
import { FirebaseService } from 'src/app/services/firebase.service';
import {ActivityListComponent} from '../activity-list/activity-list.component';

@Component({
  selector: 'app-admin-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {

  @Input()
  public activity: Activity;
  public iconImage: Observable<string | null>;

  constructor(
    public a: AdminActivitiesComponent,
    public al: ActivityListComponent,
    private firebaseService: FirebaseService,
    ) {
     }

  ngOnInit() {
    this.iconImage = this.firebaseService.lookupFileDownloadUrl(this.activity.icon, 'icon');
  }

  edit(): void {
    this.a.openDialog(this.activity);
  }

  delete(): void {
    this.al.delete(this.activity.id);
  }

}
