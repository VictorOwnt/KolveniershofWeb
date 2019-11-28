import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Workday} from '../../../shared/models/workday.model';
import {MatDialog} from "@angular/material/dialog";
import {BusNewComponent} from "../../../admin-busses/bus-new/bus-new.component";
import {CommentListComponent} from "../comment-list/comment-list.component";

@Component({
  selector: 'app-schedule-weekend',
  templateUrl: './schedule-weekend.component.html',
  styleUrls: ['./schedule-weekend.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ScheduleWeekendComponent implements OnInit {
  @Input() workday: Workday;


  constructor(public dialog: MatDialog) { }

  ngOnInit() { }

  viewComments() {
    console.log(this.workday);
    const dialogRef = this.dialog.open(CommentListComponent, {
      width: '1000px',
      data: this.workday.comments
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }

}
