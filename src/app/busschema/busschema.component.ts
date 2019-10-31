import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { MatDatepickerInputEvent } from "@angular/material";
import { BusUnitDataService } from "../busUnit.data.service";
import { BusUnit } from "../domain/busUnit.model";
import { WorkDayDataService } from "../workDay.data.service";
import { Workday } from "../domain/workday.model";

@Component({
  selector: "app-busschema",
  templateUrl: "./busschema.component.html",
  styleUrls: ["./busschema.component.css"]
})
export class BusschemaComponent implements OnInit {
  /*  public loadingError$ = this._busUnitDataService.loadingError$;
  private _fetchBusses$: Observable<BusUnit[]> = this._busUnitDataService
    .busUnits$;

  constructor(private _busUnitDataService: BusUnitDataService) {
  }

  ngOnInit() {
  }

  get busUnit$(): Observable<BusUnit[]> {
    return this._fetchBusses$;
  }*/

  /*  public loadingError$ = this._workdayDataService.loadingError$;
  private _fetchWorkday$: Observable<Workday[]> = this._workdayDataService
    .workdays$;

  constructor(private _workdayDataService: WorkDayDataService) {}

  ngOnInit() {}

  get workday$(): Observable<Workday[]> {
    return this._fetchWorkday$;
  }*/
  public loadingError$ = this._workDayDataService.loadingError$;
  private _fetchWorkday$: Observable<
    Workday
  > = this._workDayDataService.getWorkDayByDate(this.formattedDate(new Date()));
  private _workday: Workday;

  constructor(private _workDayDataService: WorkDayDataService) {
    this._fetchWorkday$.subscribe(value => (this._workday = value));
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
