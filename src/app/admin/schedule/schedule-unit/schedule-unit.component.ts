import {Component, Input, OnInit} from '@angular/core';
import {ActivityUnit} from '../../../shared/models/activityUnit.model';
import {User} from '../../../shared/models/user.model';
import {LunchUnit} from '../../../shared/models/lunchUnit.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Observable } from 'rxjs';

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

  constructor(private firebaseService: FirebaseService) { }

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
      // this.firebaseService.lookupFileDownloadUrl(mentor.picture).subscribe(img => mentor.picture = img);
   });

    this.clients = this.unit.clients;
    this.clients.forEach(async client => {
      await this.getImageUrl(client);
      // this.firebaseService.lookupFileDownloadUrl(mentor.picture).subscribe(img => mentor.picture = img);
   });
  }

  async getImageUrl(user: User) {
    return new Promise( (resolve, reject) => {
      this.firebaseService.lookupFileDownloadUrl(user.picture).toPromise()
      .then(image => resolve(user.picture = image))
      .catch((e) => reject(e));
    })
    .catch((err) => console.log(err));
      // reject('../../../assets/img/profile_picture_empty.png');
    // return this.firebaseService.lookupFileDownloadUrl(ref); // .pipe(onerror);
    // this.firebaseService.lookupFileDownloadUrl(ref);
    // console.log(this.firebaseService.lookupFileDownloadUrl(ref));
  }

  async getIconUrl(ref: string) {
    return new Promise( (resolve, reject) => {
      this.firebaseService.lookupFileDownloadUrl(ref).toPromise()
      .then(icon => resolve(this.icon = icon))
      .catch((e) => reject(e));
    })
    .catch((err) => console.log(err));
      // reject('../../../assets/img/profile_picture_empty.png');
    // return this.firebaseService.lookupFileDownloadUrl(ref); // .pipe(onerror);
    // this.firebaseService.lookupFileDownloadUrl(ref);
    // console.log(this.firebaseService.lookupFileDownloadUrl(ref));
  }

  edit() {
    // TODO - edit
  }

  delete() {
    // TODO - delete
  }

}
