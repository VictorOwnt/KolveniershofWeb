import {Component, Input, OnInit} from '@angular/core';
import {ActivityUnit} from '../../../shared/models/activityUnit.model';
import {User} from '../../../shared/models/user.model';
import {LunchUnit} from '../../../shared/models/lunchUnit.model';

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

  constructor() { }

  ngOnInit() {
    if (this.unit instanceof ActivityUnit) {
      this.title = this.unit.activity.name;
    } else if (this.unit instanceof LunchUnit) {
      this.title = this.unit.lunch;
    }
    this.mentors = this.unit.mentors;
    this.clients = this.unit.clients;
  }

  edit() {
    // TODO - edit
  }

  delete() {
    // TODO - delete
  }

}
