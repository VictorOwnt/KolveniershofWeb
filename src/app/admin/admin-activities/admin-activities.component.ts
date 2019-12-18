import {Component, OnInit} from '@angular/core';
import {Activity} from '../../models/activity.model';
import {MatDialog} from '@angular/material/dialog';
import {ActivityNewComponent} from './activity-new/activity-new.component';
import {ActivityDataService} from '../../services/activity.data.service';
import {Observable} from 'rxjs';
import {SuccessModalComponent} from '../../shared/success-modal/success-modal.component';
import {ErrorModalComponent} from '../../shared/error-modal/error-modal.component';
import {DeleteModalComponent} from '../../shared/delete-modal/delete-modal.component';

@Component({
  selector: 'app-admin-activities',
  templateUrl: './admin-activities.component.html',
  styleUrls: ['./admin-activities.component.scss']
})
export class AdminActivitiesComponent implements OnInit {
  activities: Activity[];
  iconImage: Observable<string | null>; // TODO - Icon

  constructor(public dialog: MatDialog, private activityDataService: ActivityDataService) {
  }

  ngOnInit() {
    this.activityDataService.activities$.subscribe(activities => this.activities = activities);
  }

  edit(activity?: Activity) {
    this.dialog.open(ActivityNewComponent, {
      width: '1000px',
      data: {activity}
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

  delete(activity: Activity) {
    // Open delete dialog
    this.dialog.open(DeleteModalComponent, {
      width: '500px',
      data: {itemToDelete: 'atelier'}
    }).afterClosed().subscribe(canDelete => {
      if (canDelete) {
        // Delete activity & open modal
        this.activityDataService.deleteActivity(activity.id)
          .subscribe(hasSucceeded => this.openAfterDeleteModal(hasSucceeded));
      }
    });
  }

  openAfterDeleteModal(hasSucceeded: boolean) {
    if (hasSucceeded) {
      // Success dialog
      this.dialog.open(SuccessModalComponent, {
        width: '300px',
        data: {message: 'Verwijderen compleet.'}
      });
    } else {
      // Error dialog
      this.dialog.open(ErrorModalComponent, {
        width: '300px',
        data: {message: 'Verwijderen niet gelukt. Probeer het later opnieuw.'}
      });
    }
  }
}
