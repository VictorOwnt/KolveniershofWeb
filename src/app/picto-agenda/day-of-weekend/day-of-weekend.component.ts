import { Component, OnInit, Input } from "@angular/core";
import { Workday } from "src/app/domain/workday.model";
import { StaticMethods } from "src/app/domain/staticMethods";
import { DayNameAndDate } from "../day-of-week/day-of-week.component";

@Component({
  selector: "app-day-of-weekend",
  templateUrl: "./day-of-weekend.component.html",
  styleUrls: ["./day-of-weekend.component.css"]
})
export class DayOfWeekendComponent implements OnInit {
  @Input() public weekDay: Workday; // voorlopig
  private _nameOfDay: DayNameAndDate;

  constructor() {}

  ngOnInit() {
    const date = StaticMethods.unFormattedDate(this.weekDay.date);
    this._nameOfDay = new DayNameAndDate(
      date,
      StaticMethods.getNameOfDay(date)
    );
  }

  get nameOfDay(): DayNameAndDate {
    return this._nameOfDay;
  }
}
