import { Component, OnInit, Input } from "@angular/core";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { WorkDayDataService } from "src/app/workDay.data.service";
import { Workday } from "src/app/domain/workday.model";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-algemeen-week-schedule",
  templateUrl: "./algemeen-week-schedule.component.html",
  styleUrls: ["./algemeen-week-schedule.component.css"]
})
export class AlgemeenWeekScheduleComponent implements OnInit {
  faPencilAlt = faPencilAlt;
  faTrash = faTrash;
  public loadingError$ = this._workDayDataService.loadingError$;

  private _date = new Date(2019, 1, 1);
  private _fetchWorkDays$: Observable<
    Workday
  > = this._workDayDataService.getWorkDayByDate(this._date);

  /* @Input() public workday: Workday;*/

  constructor(
    private _workDayDataService: WorkDayDataService,
    private http: HttpClient
  ) {}

  /*  getWorkDayByDate(_date): Observable<Workday> {
    return this._fetchWorkDays$;
  }*/

  get workday$(): Observable<Workday> {
    console.log(this._fetchWorkDays$);
    return this._fetchWorkDays$;
  }

  addNewWorkDay(workDay) {
    this._workDayDataService.addNewWorkDay(workDay).subscribe;
  }

  ngOnInit() {}
}
