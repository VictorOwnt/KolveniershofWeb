import {Component, Input, OnInit} from '@angular/core';
import {ActivityUnit} from '../../../shared/models/activityUnit.model';
import {LunchUnit} from '../../../shared/models/lunchUnit.model';
import {User} from '../../../shared/models/user.model';

@Component({
  selector: 'app-schedule-item',
  templateUrl: './schedule-item.component.html',
  styleUrls: ['./schedule-item.component.scss']
})
export class ScheduleItemComponent implements OnInit {
  @Input() private item: any;
  private title: string;
  private mentors: User[];
  private clients: User[];

  constructor() { }

  ngOnInit() {
    if (this.item instanceof ActivityUnit) {
      this.title = this.item.activity.name;
      this.mentors = this.item.mentors;
      this.clients = this.item.clients;
    } else if (this.item instanceof LunchUnit) {
      this.title = this.item.lunch;
      this.mentors = this.item.mentors;
      this.clients = this.item.clients;
    }
  }

  edit() {
    // TODO - edit
  }

  delete() {
    // TODO - delete
  }

}
