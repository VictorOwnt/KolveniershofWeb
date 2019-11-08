import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Workday } from "../domain/workday.model";
import { WorkDayDataService } from "../workDay.data.service";
import { HttpClient } from "@angular/common/http";
import { MatDatepickerInputEvent } from "@angular/material";

@Component({
  selector: "app-week-schedule",
  templateUrl: "./week-schedule.component.html",
  styleUrls: ["./week-schedule.component.css"]
})
export class WeekScheduleComponent implements OnInit {
  public loadingError$ = this._workDayDataService.loadingError$;
  private _fetchWorkday$: Observable<
    Workday
  > = this._workDayDataService.getWorkDayByDate(this.formattedDate(new Date()));
  private _workday: Workday;
  public planningDate: Date;
  constructor(private _workDayDataService: WorkDayDataService) {
    this._fetchWorkday$.subscribe(value => (this._workday = value));
  }

  ngOnInit() {}
  get planningDate$(): Date {
    return this.planningDate;
  }

  get workday$(): Workday {
    return this._workday;
  }

  set workday(date: Date) {
    this._workDayDataService
      .getWorkDayByDate(this.formattedDate(date))
      .subscribe(val => (this._workday = val));
  }

  formattedDate(date) {
    let month = String(date.getMonth() + 1); // month begint vanaf 0 tot 11
    let day = String(date.getDate());
    const year = String(date.getFullYear());

    if (month.length < 2) {
      month = "0" + month;
    }
    if (day.length < 2) {
      day = "0" + day;
    }

    return `${day}_${month}_${year}`;
  }

  laadDagSchema(event: MatDatepickerInputEvent<Date>) {
    this._workDayDataService
      .getWorkDayByDate(this.formattedDate(event.value))
      .subscribe(value => (this._workday = value));
  }
}
