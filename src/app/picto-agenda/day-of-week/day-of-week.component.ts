import { Component, OnInit, Input } from '@angular/core';
import { Workday } from 'src/app/domain/workday.model';
import { FormControl } from '@angular/forms';
import { ActivityUnit } from 'src/app/domain/activityUnit.model';
import { StaticMethodsPicto } from 'src/app/domain/staticMethods';

export class DayNameAndDate {
  constructor(private _date: Date, private _name: string) {}
  get date() {
    return this._date;
  }

  get name() {
    return this._name;
  }
}

@Component({
  selector: 'app-day-of-week',
  templateUrl: './day-of-week.component.html',
  styleUrls: ['./day-of-week.component.scss']
})
export class DayOfWeekComponent implements OnInit {
  @Input() public weekDay: Workday;

  public commentFormControl = new FormControl('', []);

  private _nameOfDay: DayNameAndDate;

  constructor() {}

  getMentors(activity: ActivityUnit): string {
    const mentors = new Array();
    activity.mentors.forEach(mentor =>
      mentors.push(`${mentor.firstName} ${mentor.lastName}`)
    );
    return mentors.toString();
  }

  ngOnInit() {
    const date = StaticMethodsPicto.unFormattedDate(this.weekDay.date);
    this._nameOfDay = new DayNameAndDate(
      date,
      StaticMethodsPicto.getNameOfDay(date)
    );
  }

  get nameOfDay(): DayNameAndDate {
    return this._nameOfDay;
  }
}
