import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Workday } from "../domain/workday.model";
import { WorkDayDataService } from "../services/workDay.data.service";
import {
  MatDatepickerInputEvent,
  MatDialogRef,
  MatDialog
} from "@angular/material";
import { EditWeekScheduleComponent } from "../edit-week-schedule/edit-week-schedule.component";
import { StaticMethodsPicto } from "../domain/staticMethods";

@Component({
  selector: "app-week-schedule",
  templateUrl: "./week-schedule.component.html",
  styleUrls: ["./week-schedule.component.scss"]
})
export class WeekScheduleComponent implements OnInit {
  private namesOfBlocks = ["Algemeen", "Voormiddag", "Extra", "Namiddag"];
  public loadingError$ = this._workDayDataService.loadingError$;
  private _fetchWorkday$: Observable<
    Workday
  > = this._workDayDataService.getWorkDayByDate(
    StaticMethodsPicto.formattedDate(new Date())
  );
  private _workday: Workday;
  public planningDate: Date;
  editWeekSchedule: MatDialogRef<EditWeekScheduleComponent>;

  constructor(
    private _workDayDataService: WorkDayDataService,
    private dialog: MatDialog
  ) {
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
      .getWorkDayByDate(StaticMethodsPicto.formattedDate(date))
      .subscribe(val => (this._workday = val));
  }

  laadDagSchema(event: MatDatepickerInputEvent<Date>) {
    this.planningDate= event.value;
    this._workDayDataService
      .getWorkDayByDate(StaticMethodsPicto.formattedDate(event.value))
      .subscribe(value => (this._workday = value));
  }
}
