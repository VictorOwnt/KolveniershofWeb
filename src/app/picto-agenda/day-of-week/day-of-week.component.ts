import { Component, OnInit, Input } from "@angular/core";
import { Workday } from "src/app/domain/workday.model";

export class DayNameAndDate {
  constructor(private _date: Date, private _name: string, private _icon = "") {}
  get date() {
    return this._date;
  }

  get name() {
    return this._name;
  }

  get icon() {
    return this._icon;
  }
}

@Component({
  selector: "app-day-of-week",
  templateUrl: "./day-of-week.component.html",
  styleUrls: ["./day-of-week.component.css"]
})
export class DayOfWeekComponent implements OnInit {
  @Input() public workday: Workday;

  private namesOfDays = [
    "Maandag",
    "Dinsdag",
    "Woensdag",
    "Donderdag",
    "Vrijdag",
    "Zaterdag",
    "Zondag"
  ];
  public nameOfDay: DayNameAndDate;
  constructor() {}

  ngOnInit() {
    const date = this.unFormattedDate(this.workday.date);
    this.nameOfDay = new DayNameAndDate(date, this.getNameOfDay(date));
    console.log(this.workday.lunch.icon);
  }

  getNameOfDay(date) {
    console.log(date);
    return this.namesOfDays[date.getDay() - 1];
  }

  unFormattedDate(date: any) {
    date = date.split("_");
    const day = date[0];
    const month = date[1] - 1;
    const year = date[2];
    return new Date(year, month, day);
  }
}
