import {Component, Input, OnInit} from '@angular/core';
import {ActivityUnit} from "../../../shared/models/activityUnit.model";
import {Activity} from "../../../shared/models/activity.model";

@Component({
  selector: 'app-admin-activity',
  templateUrl: './admin-activity.component.html',
  styleUrls: ['./admin-activity.component.scss']
})
export class AdminActivityComponent implements OnInit {

  @Input() public activity: Activity;

  constructor() { }

  ngOnInit() {
  }

}
