import {Component, Input, OnInit} from '@angular/core';
import {ActivityUnit} from '../../models/activityUnit.model';
import {User} from '../../models/user.model';
import {LunchUnit} from '../../models/lunchUnit.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import {EditUnitModalComponent} from './edit-unit-modal/edit-unit-modal.component';
import {MatDialog} from '@angular/material/dialog';
import {ActivityDataService} from '../../services/activity.data.service';
import {LunchDataService} from '../../services/lunch.data.service';
import {DeleteModalComponent} from '../../shared/delete-modal/delete-modal.component';
import {SuccessModalComponent} from '../../shared/success-modal/success-modal.component';
import {ErrorModalComponent} from '../../shared/error-modal/error-modal.component';
import {Workday} from '../../models/workday.model';
import {WorkdayTemplate} from '../../models/workdayTemplate.model';

@Component({
  selector: 'app-schedule-unit',
  templateUrl: './schedule-unit.component.html',
  styleUrls: ['./schedule-unit.component.scss']
})
export class ScheduleUnitComponent implements OnInit {
  @Input() private unit: any;
  @Input() private workday?: Workday;
  @Input() private workdayTemplate?: WorkdayTemplate;
  @Input() private isAm?: boolean;
  title: string;
  icon: string;
  mentors: User[] = [];
  clients: User[] = [];
  expandClients = true;
  expandMentors = true;

  constructor(
    private firebaseService: FirebaseService,
    public dialog: MatDialog,
    private activityDataService: ActivityDataService,
    private lunchDataService: LunchDataService
  ) { }

  ngOnInit() {
    if (this.unit instanceof ActivityUnit) {
      this.title = this.unit.activity.name;
      this.getIconUrl(this.unit.activity.icon);
    } else if (this.unit instanceof LunchUnit) {
      this.title = this.unit.lunch;
      this.getIconUrl('icons/icon-restaurant.svg');
    }
    this.mentors = this.unit.mentors;
    this.mentors.forEach(async mentor => {
      await this.getImageUrl(mentor);
   });
    if(this.mentors.length > 2)
      this.expandMentors = false;

    this.clients = this.unit.clients;
    this.clients.forEach(async client => {
      await this.getImageUrl(client);
   });

    if(this.clients.length > 2)
      this.expandClients = false;
  }

  async getImageUrl(user: User) {
    return new Promise( (resolve, reject) => {
      this.firebaseService.lookupFileDownloadUrl(user.picture, 'user').toPromise()
      .then(image => resolve(user.picture = image))
      .catch((e) => reject(e));
    })
    .catch((err) => console.log(err));
  }

  async getIconUrl(ref: string) {
    return new Promise( (resolve, reject) => {
      this.firebaseService.lookupFileDownloadUrl(ref, 'icon').toPromise()
      .then(icon => resolve(this.icon = icon))
      .catch((e) => reject(e));
    })
    .catch((err) => console.log(err));
  }

  edit() {
    this.dialog.open(EditUnitModalComponent, {
      width: '1000px',
      data: {
        unit: this.unit,
        workday: this.workday,
        workdayTemplate: this.workdayTemplate,
        isAm: this.isAm
      }
    }).afterClosed().subscribe(message => {
      if (message) {
        this.dialog.open(SuccessModalComponent, {
          width: '300px',
          data: { message }
        });
      }
    });
  }

  delete() {
    if (this.unit instanceof ActivityUnit) {
      // Open delete dialog
      this.dialog.open(DeleteModalComponent, {
        width: '500px',
        data: { itemToDelete: 'atelier' }
      }).afterClosed().subscribe(canDelete => {
        if (canDelete) {
          // Delete unit & open modal
          this.activityDataService.deleteActivityUnit(this.unit, this.workday.id, this.workdayTemplate.id)
            .subscribe(hasSucceeded => this.openAfterDeleteModal(hasSucceeded));
        }
      });
    } else if (this.unit instanceof LunchUnit) {
      // Open delete dialog
      this.dialog.open(DeleteModalComponent, {
        width: '500px',
        data: { itemToDelete: 'lunch' }
      }).afterClosed().subscribe(canDelete => {
        if (canDelete) {
          // Delete unit & open modal
          this.lunchDataService.deleteLunchUnit(this.unit, this.workday.id, this.workdayTemplate.id)
            .subscribe(hasSucceeded => this.openAfterDeleteModal(hasSucceeded));
        }
      });
    }
  }

  openAfterDeleteModal(hasSucceeded: boolean) {
    if (hasSucceeded) {
      // Success dialog
      this.dialog.open(SuccessModalComponent, {
        width: '300px',
        data: { message: 'Verwijderen compleet.' }
      });
    } else {
      // Error dialog
      this.dialog.open(ErrorModalComponent, {
        width: '300px',
        data: { message: 'Verwijderen niet gelukt. Probeer het later opnieuw.' }
      });
    }
  }

}
