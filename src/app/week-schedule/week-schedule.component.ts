import { Component, OnInit } from "@angular/core";
import { faGreaterThan } from "@fortawesome/free-solid-svg-icons";
import { faLessThan } from "@fortawesome/free-solid-svg-icons";
import { Observable } from "rxjs";
import { Workday } from "../domain/workday.model";
import { WorkDayDataService } from "../workDay.data.service";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { MatDatepickerInputEvent } from "@angular/material";

@Component({
  selector: "app-week-schedule",
  templateUrl: "./week-schedule.component.html",
  styleUrls: ["./week-schedule.component.css"]
})
export class WeekScheduleComponent implements OnInit {
  faGreaterThan = faGreaterThan;
  faLessThan = faLessThan;

  public loadingError$ = this._workDayDataService.loadingError$;
  private _fetchWorkday$: Observable<
    Workday
  > = this._workDayDataService.getWorkDayByDate(this.formattedDate(new Date()));
  private _workday: Workday;
  private testdate: string;

  constructor(
    private _workDayDataService: WorkDayDataService,
    private http: HttpClient
  ) {
    this._fetchWorkday$.subscribe(val => (this._workday = val));
  }

  ngOnInit() {
    // this.workday$.subscribe(e => console.log(e));
  }

  get workday$(): Workday {
    return this._workday;
  }

  set workday(date: Date) {
    this._workDayDataService
      .getWorkDayByDate(this.formattedDate(date))
      .subscribe(val => (this._workday = val));
  }

  formattedDate(d) {
    let month = String(d.getMonth() + 1); // month begint vanaf 0 tot 11
    let day = String(d.getDate());
    const year = String(d.getFullYear());

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
      .subscribe(val => (this._workday = val));
  }
}
