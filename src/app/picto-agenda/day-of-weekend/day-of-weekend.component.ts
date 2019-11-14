import { Component, OnInit, Input } from "@angular/core";
import { Workday } from "src/app/domain/workday.model";
import { StaticMethodsPicto } from "src/app/domain/staticMethods";
import { DayNameAndDate } from "../day-of-week/day-of-week.component";

@Component({
  selector: "app-day-of-weekend",
  templateUrl: "./day-of-weekend.component.html",
  styleUrls: ["./day-of-weekend.component.scss"]
})
export class DayOfWeekendComponent implements OnInit {
  @Input() public weekDay: Workday; // voorlopig
  private _nameOfDay: DayNameAndDate;

  constructor() {}

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
