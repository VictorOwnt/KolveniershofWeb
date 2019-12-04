import {Component, Input, OnInit} from '@angular/core';
import {ActivityUnit} from '../../../shared/models/activityUnit.model';
import {User} from '../../../shared/models/user.model';
import {LunchUnit} from '../../../shared/models/lunchUnit.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import {ScheduleEditComponent} from '../schedule-edit/schedule-edit.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-schedule-unit',
  templateUrl: './schedule-unit.component.html',
  styleUrls: ['./schedule-unit.component.scss']
})
export class ScheduleUnitComponent implements OnInit {
  @Input() private unit: any;
  title: string;
  icon: string;
  mentors: User[] = [];
  clients: User[] = [];

  constructor(private firebaseService: FirebaseService, public dialog: MatDialog) { }

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

    this.clients = this.unit.clients;
    this.clients.forEach(async client => {
      await this.getImageUrl(client);
   });
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
    const dialogRef = this.dialog.open(ScheduleEditComponent, {
      width: '1000px',
      data: this.unit
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }

  delete() {
    // TODO - delete
  }

}
