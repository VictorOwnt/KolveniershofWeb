import {Component, Input, OnInit} from '@angular/core';
import {ActivityUnit} from '../../../shared/models/activityUnit.model';
import {User} from '../../../shared/models/user.model';
import {LunchUnit} from '../../../shared/models/lunchUnit.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Observable } from 'rxjs';
import {ScheduleEditComponent} from "../schedule-edit/schedule-edit.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-schedule-unit',
  templateUrl: './schedule-unit.component.html',
  styleUrls: ['./schedule-unit.component.scss']
})
export class ScheduleUnitComponent implements OnInit {
  @Input() private unit: any;
  title: string;
  mentors: User[] = [];
  clients: User[] = [];

  constructor(private firebaseService: FirebaseService, public dialog: MatDialog) { }

  ngOnInit() {
    if (this.unit instanceof ActivityUnit) {
      this.title = this.unit.activity.name;
    } else if (this.unit instanceof LunchUnit) {
      this.title = this.unit.lunch;
    }
    this.mentors = this.unit.mentors;
    this.clients = this.unit.clients;
    this.mentors.forEach(mentor => {
       this.getImageUrl(mentor.picture).subscribe(url => mentor.picture = url);
    });
    this.clients.forEach(client => {
      this.getImageUrl(client.picture).subscribe(url => client.picture = url);
    });
  }

  getImageUrl(ref: string): Observable<string | null> {
    return this.firebaseService.lookupFileDownloadUrl(ref);
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
