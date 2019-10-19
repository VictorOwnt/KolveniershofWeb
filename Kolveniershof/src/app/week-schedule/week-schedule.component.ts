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
  private date = new Date(2019,1,1);// to delete
  public loadingError$ = this._workDayDataService.loadingError$;
  private _fetchWorkday$: Observable<Workday> = this._workDayDataService.getWorkDayByDate(this.formattedDate(this.date)); //Haalt momenteel alles op, was makkelijker om zo te testen
 
  constructor(
    private _workDayDataService: WorkDayDataService,
    private http: HttpClient
  ) {}

  ngOnInit() {}

  get workday$(): Observable<Workday>{
   
    return this._fetchWorkday$;

  }

  formattedDate(d = new Date) {
    let month = String(d.getMonth() + 1);
    let day = String(d.getDate());
    const year = String(d.getFullYear());
  
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
  
    return `${year}_${month}_${day}`;
  }
  

  
}
