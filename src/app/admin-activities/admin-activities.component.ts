import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {User} from "../shared/models/user.model";
import {ActivityDataService} from '../services/activity.data.service';
import {Activity} from "../shared/models/activity.model";

@Component({
  selector: 'app-admin-activities',
  templateUrl: './admin-activities.component.html',
  styleUrls: ['./admin-activities.component.scss']
})
export class AdminActivitiesComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }


}
