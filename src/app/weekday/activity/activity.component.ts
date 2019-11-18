import {Component, Input, OnInit} from '@angular/core';
import {Workday} from "../../shared/models/workday.model";
import {Activity} from "../../shared/models/activity.model";
import {ActivityUnit} from "../../shared/models/activityUnit.model";

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {
  @Input() public activity: ActivityUnit;

  constructor() { }

  ngOnInit() {
  }

  getMentors(activity: ActivityUnit): string {
    const mentors = new Array();
    activity.mentors.forEach(mentor =>
        mentors.push(`${mentor.firstName} ${mentor.lastName}`)
    );
    return mentors.toString();
  }
}
