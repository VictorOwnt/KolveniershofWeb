import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { API_URL } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Workday } from '../shared/models/workday.model';
import { LunchUnit } from '../shared/models/lunchUnit.model';

@Injectable({
  providedIn: 'root'
})
export class WorkDayDataService {
  public loadingError$ = new Subject<string>();

  constructor(private http: HttpClient) { }

  get workdays$(): Observable<Workday[]> {
    return this.http.get(`${API_URL}/Workdays`).pipe(
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
      `${API_URL}/Workdays`,
      workday.toJSON()
    );
  }

  getWorkDayById(id): Observable<Workday> {
    return this.http
      .get(`${API_URL}/Workdays/${id}`)
      .pipe(map((workDay: any): Workday => Workday.fromJSON(workDay)));
  }

  getWorkDayByDate(date): Observable<Workday> {
    return this.http
      .get(`${API_URL}/Workdays/date/${date}`)
      .pipe(
        map(
          (workDay: any): Workday => {
            return Workday.fromJSON(workDay);
          }
        )
      );
  }

  updateLunch(lunch: LunchUnit) {
    return this.http.patch(`${API_URL}/units/${lunch.id}`, lunch.toJSON());
  }
}
