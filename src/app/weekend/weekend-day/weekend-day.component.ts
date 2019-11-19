import {Component, Input, OnInit} from '@angular/core';
import {Workday} from "../../shared/models/workday.model";
import {StaticMethodsPicto} from "../../domain/staticMethods";


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
  selector: 'app-weekend-day',
  templateUrl: './weekend-day.component.html',
  styleUrls: ['./weekend-day.component.scss']
})
export class WeekendDayComponent implements OnInit {
  @Input() public weekDay: Workday;
  private _nameOfDay: DayNameAndDate;

  constructor() { }

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
