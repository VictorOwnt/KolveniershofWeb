import {Component, OnInit} from '@angular/core';
import {Activity} from '../../models/activity.model';
import {ActivityDataService} from '../../services/activity.data.service';
import {ActivityNewComponent} from '../admin-activities/activity-new/activity-new.component';
import {SuccessModalComponent} from '../../shared/success-modal/success-modal.component';
import {ErrorModalComponent} from '../../shared/error-modal/error-modal.component';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material';


@Component({
  selector: 'app-admin-activities',
  templateUrl: './admin-activities.component.html',
  styleUrls: ['./admin-activities.component.scss']
})
export class AdminActivitiesComponent implements OnInit {
  activities$: Observable<Activity[]>;
  constructor(public dialog: MatDialog, private activityDataService: ActivityDataService) {
  }

  ngOnInit() {
    this.activities$ = this.activityDataService.activities$;
  }

  create() {
    this.dialog.open(ActivityNewComponent, {
      width: '1000px',
      data: {}
    }).afterClosed().subscribe(message => {
      if (message && message !== false) {
        this.dialog.open(SuccessModalComponent, {
          width: '300px',
          data: {message}
        });
      } else if (message === false) {
        // Open error dialog
        this.dialog.open(ErrorModalComponent, {
          width: '300px',
          data: {message: 'Probeer later opnieuw.'}
        });
      }
    });
  }

}
