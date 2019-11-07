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
  selector: "app-day-of-weekend",
  templateUrl: "./day-of-weekend.component.html",
  styleUrls: ["./day-of-weekend.component.css"]
})
export class DayOfWeekendComponent implements OnInit {
  /* een lijstje (kan eventueel een enum worden ergens) met de namen van de dagen van de week
  die dan gebruikt worden om helemaal van boven de dag van de week in het nederlands te displayen*/
  private namesOfDays = [
    "Zondag",
    "Maandag",
    "Dinsdag",
    "Woensdag",
    "Donderdag",
    "Vrijdag",
    "Zaterdag"
  ];

  // gekregen van de parent
  @Input() public weekDay: Workday; // voorlopig want in databank bestaat nog niets specifiek voor weekend dagen
  public nameOfDay: DayNameAndDate;

  constructor() {}

  ngOnInit() {
    const date = this.unFormattedDate(this.weekDay.date);
    this.nameOfDay = new DayNameAndDate(date, this.getNameOfDay(date));
  }

  getNameOfDay(date: Date) {
    console.log(date.getDay());
    return this.namesOfDays[date.getDay()];
  }

  unFormattedDate(date: any) {
    date = date.split("-");
    const year = date[0];
    const month = date[1] - 1;
    const day = date[2];
    if (day.charAt(0) === "0") {
      return new Date(year, month, day.substring(1, 2));
    }
    return new Date(year, month, day.substring(0, 2));
  }

  get nameOfDay$(): DayNameAndDate {
    return this.nameOfDay;
  }
}
