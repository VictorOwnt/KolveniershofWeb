import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../../models/user.model';
import {MatDialog} from '@angular/material';
import {UserDataService} from '../../services/user.data.service';
import {SuccessModalComponent} from '../../shared/success-modal/success-modal.component';
import {ErrorModalComponent} from '../../shared/error-modal/error-modal.component';
import {UserNewComponent} from './user-new/user-new.component';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {
  mentors$: Observable<User[]>;
  clients$: Observable<User[]>;

  constructor(public dialog: MatDialog, private userDataService: UserDataService) {
    this.mentors$ = this.userDataService.mentors$;
    this.clients$ = this.userDataService.clients$;
  }

  ngOnInit() {
  }

  create() {
    this.dialog.open(UserNewComponent, {
      width: '500px',
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
