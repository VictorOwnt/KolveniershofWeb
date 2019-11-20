import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {User} from "../shared/models/user.model";
import {ActivityDataService} from '../services/activity.data.service';
import {Activity} from "../shared/models/activity.model";
import {MatDialog} from "@angular/material/dialog";
import {ActivityNewComponent} from "./activity-new/activity-new.component";

@Component({
  selector: 'app-admin-activities',
  templateUrl: './admin-activities.component.html',
  styleUrls: ['./admin-activities.component.scss']
})
export class AdminActivitiesComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(ActivityNewComponent, {
      width: '1000px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }


  ngOnInit() {
  }


}
