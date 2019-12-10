import {Component, Input, OnInit} from '@angular/core';
import {Workday} from '../../models/workday.model';
import {MatDialog} from '@angular/material/dialog';
import {CommentListComponent} from '../comment-list/comment-list.component';
import { Observable } from 'rxjs';
import { FirebaseService } from 'src/app/services/firebase.service';
import { WorkdayDataService } from 'src/app/services/workday.data.service';
import {AuthenticationService} from '../../authentication/authentication.service';

@Component({
  selector: 'app-schedule-weekend',
  templateUrl: './schedule-weekend.component.html',
  styleUrls: ['./schedule-weekend.component.scss']
})
export class ScheduleWeekendComponent implements OnInit {
  @Input() workday: Workday;
  icon: Observable<string | null>;
  isAdmin?: boolean;

  constructor(
    public dialog: MatDialog,
    private workdayDataService: WorkdayDataService,
    private firebaseService: FirebaseService,
    private auth: AuthenticationService
   ) {}

  ngOnInit() {
    this.isAdmin = this.auth.currentUser.admin;
    this.icon = this.firebaseService.lookupFileDownloadUrl(this.workdayDataService.getDayIcon(this.workday.date.getDay()), 'icon');
   }

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
