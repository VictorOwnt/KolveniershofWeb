import {Component, Input, OnInit} from '@angular/core';
import {Workday} from "../shared/models/workday.model";
import {StaticMethodsPicto} from "../domain/staticMethods";

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
  selector: 'app-holiday',
  templateUrl: './holiday.component.html',
  styleUrls: ['./holiday.component.scss']
})
export class HolidayComponent implements OnInit {
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
