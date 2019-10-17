import { Component, OnInit } from "@angular/core";
import { faGreaterThan } from "@fortawesome/free-solid-svg-icons";
import { faLessThan } from "@fortawesome/free-solid-svg-icons";
import { Observable } from 'rxjs';
import { Workday } from '../domain/workday.model';
import { WorkDayDataService } from '../workDay.data.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: "app-week-schedule",
  templateUrl: "./week-schedule.component.html",
  styleUrls: ["./week-schedule.component.css"]
})
export class WeekScheduleComponent implements OnInit {
  faGreaterThan = faGreaterThan;
  faLessThan = faLessThan;
  private date = new Date(2019,1,1);
  public loadingError$ = this._workDayDataService.loadingError$;
  private _fetchWorkday$: Observable<Workday[]> = this._workDayDataService.workdays$; //Haalt momenteel alles op, was makkelijker om zo te testen
 
  constructor(
    private _workDayDataService: WorkDayDataService,
    private http: HttpClient
  ) {}

  ngOnInit() {}

  get workdays$(): Observable<Workday[]>{
   
    return this._fetchWorkday$;

  }

  
}
