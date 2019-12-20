import {Component, Input, OnInit} from '@angular/core';
import {Activity} from 'src/app/models/activity.model';
import {FirebaseService} from 'src/app/services/firebase.service';
import {MatDialog} from '@angular/material/dialog';
import {ActivityNewComponent} from '../activity-new/activity-new.component';
import {SuccessModalComponent} from '../../../shared/success-modal/success-modal.component';
import {ErrorModalComponent} from '../../../shared/error-modal/error-modal.component';
import {DeleteModalComponent} from '../../../shared/delete-modal/delete-modal.component';
import {Observable} from 'rxjs';
import {ActivityDataService} from 'src/app/services/activity.data.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {
  @Input() activity: Activity;
  iconImage: Observable<string | null>;

  constructor(public dialog: MatDialog, private activityDataService: ActivityDataService, private firebaseService: FirebaseService) {
  }

  ngOnInit() {
    this.iconImage = this.firebaseService.lookupFileDownloadUrl(this.activity.icon, 'icon');
  }

  edit(activity: Activity) {
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
