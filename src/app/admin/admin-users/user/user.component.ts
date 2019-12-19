import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../../../models/user.model';
import {MatDialog} from '@angular/material/dialog';
import {FirebaseService} from '../../../services/firebase.service';
import {SuccessModalComponent} from '../../../shared/success-modal/success-modal.component';
import {ErrorModalComponent} from '../../../shared/error-modal/error-modal.component';
import {DeleteModalComponent} from '../../../shared/delete-modal/delete-modal.component';
import {EditProfileComponent} from '../../../authentication/edit-profile/edit-profile.component';
import {UserDataService} from '../../../services/user.data.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  @Input() user: User;
  profilePicture: Observable<string | null>;

  constructor(public dialog: MatDialog, private userDataService: UserDataService, private firebaseService: FirebaseService) {
  }

  ngOnInit() {
    this.profilePicture = this.firebaseService.lookupFileDownloadUrl(this.user.picture, 'user');
  }

  edit(user: User) {
    this.dialog.open(EditProfileComponent, {
      width: '1000px',
      data: {user}
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

  delete(user: User) {
    // Open delete dialog
    this.dialog.open(DeleteModalComponent, {
      width: '500px',
      data: {itemToDelete: 'gebruiker'}
    }).afterClosed().subscribe(canDelete => {
      if (canDelete) {
        // Delete activity & open modal
        this.userDataService.deleteUser(user)
          .subscribe(hasSucceeded => this.openAfterDeleteModal(hasSucceeded), (err: HttpErrorResponse) => {
            // Open error dialog
            this.dialog.open(ErrorModalComponent, {
              width: '300px',
              data: {message: err.error instanceof Error ? err.error.message : err.error}
            });
          });
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
