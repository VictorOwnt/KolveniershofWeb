import {Component, Input, OnInit} from '@angular/core';
import {ActivityUnit} from '../../models/activityUnit.model';

@Component({
  selector: 'app-activity',
  templateUrl: './picto-activity.component.html',
  styleUrls: ['./picto-activity.component.scss']
})
export class PictoActivityComponent implements OnInit {
  @Input() public activity: ActivityUnit;

  constructor() { }

  ngOnInit() {
  }

  getMentors(activity: ActivityUnit): string {
    const mentors = [];
    activity.mentors.forEach(mentor =>
        mentors.push(`${mentor.firstName} ${mentor.lastName}`)
    );
    return mentors.toString();
  }
}
