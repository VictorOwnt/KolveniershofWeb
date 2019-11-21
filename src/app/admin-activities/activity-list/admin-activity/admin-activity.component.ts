import {Component, Input, OnInit} from '@angular/core';
import {ActivityUnit} from "../../../shared/models/activityUnit.model";
import {Activity} from "../../../shared/models/activity.model";
import {ActivityNewComponent} from "../../activity-new/activity-new.component";
import {AdminActivitiesComponent} from "../../admin-activities.component";

@Component({
  selector: 'app-admin-activity',
  templateUrl: './admin-activity.component.html',
  styleUrls: ['./admin-activity.component.scss']
})
export class AdminActivityComponent implements OnInit {

  @Input() public activity: Activity;

  constructor(public _a : AdminActivitiesComponent) { }

  ngOnInit() {
  }

  edit(): void {
    this._a.openDialog(this.activity);
  }

}
