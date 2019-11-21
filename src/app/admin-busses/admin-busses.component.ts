import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {Activity} from "../shared/models/activity.model";
import {ActivityNewComponent} from "../admin-activities/activity-new/activity-new.component";
import {Bus} from "../shared/models/bus.model";
import {BusNewComponent} from "./bus-new/bus-new.component";

@Component({
  selector: 'app-admin-busses',
  templateUrl: './admin-busses.component.html',
  styleUrls: ['./admin-busses.component.scss']
})
export class AdminBussesComponent implements OnInit {

  constructor(public dialog: MatDialog) {}

  openDialog(b : Bus = null): void {
    const dialogRef = this.dialog.open(BusNewComponent, {
      width: '1000px',
      data: b
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }


  ngOnInit() {
  }



}
