import { Injectable } from "@angular/core";
import { Observable, Subject, of } from "rxjs";
import { map, share, catchError, delay, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Workday } from "./domain/workday.model";

@Injectable({
  providedIn: "root"
})
export class WorkDayDataService {
  public loadingError$ = new Subject<string>();
  constructor(private http: HttpClient) {}

  get workdays$(): Observable<Workday[]> {
    return this.http.get(`${environment.apiUrl}/API/workdays`).pipe(
      catchError(error => {
        console.log("fout ophalen" + error);
        this.loadingError$.next(error.statusText);
        return of(null);
      }), tap(x => console.log("records ontvangen")),
      map((list: any[]): Workday[] => list.map(Workday.fromJSON))
    );
  }

  addNewWorkDay(workday: Workday) {
    return this.http.post(
      `${environment.apiUrl}/API/workdays`,
      workday.toJSON()
    );
  }

  getWorkDayById(id): Observable<Workday> {
    return this.http
      .get(`${environment.apiUrl}/API/workdays/${id}`)
      .pipe(map((workDay: any): Workday => Workday.fromJSON(workDay)));
  }

  getWorkdaysByDate(dateString): Observable<Workday> {
    return this.http
      .get(`${environment.apiUrl}/API/workdays/date/${dateString}`)
      .pipe(map(Workday.fromJSON));
  }
}
