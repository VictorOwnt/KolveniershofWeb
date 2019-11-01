import { Component, OnInit, Input } from "@angular/core";
import { Workday } from "src/app/domain/workday.model";
import { FormControl } from "@angular/forms";

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
  @Input() public weekDay: Workday;
  
  
  public commentFormControl = new FormControl("", []);

  private namesOfDays = [
    "Zondag",
    "Maandag",
    "Dinsdag",
    "Woensdag",
    "Donderdag",
    "Vrijdag",
    "Zaterdag"
  ];
  private nameOfDay: DayNameAndDate;

  constructor() {
   // console.log(`${this.weekDay.date}`);
  }

  ngOnInit() {
   // console.log(`${this.weekDay.date}`);
    const date = this.unFormattedDate(this.weekDay.date);
    this.nameOfDay = new DayNameAndDate(date, this.getNameOfDay(date));
  }

  getNameOfDay(date) {
    return this.namesOfDays[date.getDay()];
  }

  unFormattedDate(date: any) {
    date = date.split("-");
    const year = date[0];
    const month = date[1] - 1;
    const day = date[2];
    if(day.charAt(0) === "0"){
      return new Date(year, month, day.substring(1,2));
    }
    return new Date(year, month, day.substring(0,2));
    
    
  }

  get nameOfDay$(): DayNameAndDate{
    return this.nameOfDay;
  }
}