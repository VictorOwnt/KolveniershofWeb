import { Component, OnInit } from "@angular/core";
import { Workday } from "../domain/workday.model";
import { WorkDayDataService } from "../workDay.data.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { MatDatepickerInputEvent } from "@angular/material";

@Component({
  selector: "app-busschema",
  templateUrl: "./busschema.component.html",
  styleUrls: ["./busschema.component.css"]
})
export class BusschemaComponent implements OnInit {
  public loadingError$ = this._workDayDataService.loadingError$;
  private _fetchWorkday$: Observable<
    Workday
  > = this._workDayDataService.getWorkDayByDate(this.formattedDate(new Date()));
  private _workday: Workday;

  constructor(
    private _workDayDataService: WorkDayDataService,
    private http: HttpClient
  ) {
    this._fetchWorkday$.subscribe(value => (this._workday = value));
  }

  ngOnInit() {}

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
