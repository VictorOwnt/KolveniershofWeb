import {Component, Input, OnInit} from '@angular/core';
import {Workday} from '../../models/workday.model';
import {WorkdayDataService} from '../../services/workday.data.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Observable } from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {CommentListComponent} from '../comment-list/comment-list.component';
import {CommentNewComponent} from '../comment-new/comment-new.component';

@Component({
  selector: 'app-schedule-weekday',
  templateUrl: './schedule-weekday.component.html',
  styleUrls: ['./schedule-weekday.component.scss']
})
export class ScheduleWeekdayComponent implements OnInit {
  @Input() workday: Workday;
  @Input() isAdmin: boolean;
  icon: Observable<string | null>;

  constructor(
    public dialog: MatDialog,
    private workdayDataService: WorkdayDataService,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit() {
    this.icon = this.firebaseService.lookupFileDownloadUrl(this.workdayDataService.getDayIcon(this.workday.date.getDay()), 'icon');
  }

  newUnit(type: string, isAm: boolean = null) {
    // TODO
  }

  changeHoliday(holiday: boolean) {
    this.workday.holiday = holiday;
    this.workdayDataService.patchWorkday(this.workday);
  }

  viewComments() {
    // TODO
  }

  addComment() {
    const dialogRef = this.dialog.open(CommentNewComponent, {
      width: '1000px',
      data: this.workday
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }
}
