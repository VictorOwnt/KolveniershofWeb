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
    return this.http.get(`${environment.apiUrl}/API/Workdays`).pipe(
      catchError(error => {
        this.loadingError$.next(error.statusText);
        return of(null);
      }),
      map((list: any[]): Workday[] => list.map(Workday.fromJSON))
    );
  }

  addNewWorkDay(workday: Workday) {
    // Als je deze werkdag wil opslaan, moet je hem toevoegen aan de databank.
    return this.http.post(
      `${environment.apiUrl}/API/Workdays`,
      workday.toJSON()
    );
  }

  getWorkDayById(id): Observable<Workday> {
    return this.http
      .get(`${environment.apiUrl}/API/Workdays/${id}`)
      .pipe(map((workDay: any): Workday => Workday.fromJSON(workDay)));
  }

  getWorkDayByDate(date): Observable<Workday> {
    return this.http
      .get(`${environment.apiUrl}/API/Workdays/date/${date}`)
      .pipe(
        map(
          (workDay: any): Workday => {
            return Workday.fromJSON(workDay);
          }
        )
      );
  }
}
