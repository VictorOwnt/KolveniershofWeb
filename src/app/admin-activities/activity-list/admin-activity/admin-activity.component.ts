import {Component, Input, OnInit} from '@angular/core';
import {Activity} from '../../../shared/models/activity.model';
import {AdminActivitiesComponent} from '../../admin-activities.component';
import { Observable } from 'rxjs';
import { FirebaseService } from 'src/app/services/firebase.service';
import {ActivityListComponent} from "../activity-list.component";

@Component({
  selector: 'app-admin-activity',
  templateUrl: './admin-activity.component.html',
  styleUrls: ['./admin-activity.component.scss']
})
export class AdminActivityComponent implements OnInit {

  @Input()
  public activity: Activity;
  public iconImage: Observable<string | null>;

  constructor(
    public _a : AdminActivitiesComponent,
  public _al : ActivityListComponent,
    private _firebaseService: FirebaseService,
    ) {
     }

  ngOnInit() {
    this.iconImage = this._firebaseService.lookupFileDownloadUrl(this.activity.icon);
  }

  edit(): void {
    this._a.openDialog(this.activity);
  }

  delete(): void {
    this._al.delete(this.activity.id);
  }

}
