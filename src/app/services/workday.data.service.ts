import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { API_URL } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Workday } from '../shared/models/workday.model';
import { LunchUnit } from '../shared/models/lunchUnit.model';
import {DatesService} from './dates.service';

@Injectable({
  providedIn: 'root'
})
export class WorkdayDataService {
  public loadingError = new Subject<string>();

  constructor(private http: HttpClient, private datesService: DatesService) { }

  get workdays$(): Observable<Workday[]> {
    return this.http.get(`${API_URL}/Workdays`).pipe(
      catchError(error => {
        this.loadingError.next(error.statusText);
        return of(null);
      }),
      map((list: any[]): Workday[] => list.map(Workday.fromJSON))
    );
  }

  postWorkday(workday: Workday) {
    return this.http.post(`${API_URL}/workdays`, workday.toJSON());
  }

  getWorkdayById(id: string): Observable<Workday> {
    return this.http
      .get(`${API_URL}/workdays/id/${id}`)
      .pipe(map((workday: any): Workday => Workday.fromJSON(workday)));
  }

  getWorkdayByDate(date: Date): Observable<Workday> {
    return this.http
      .get(`${API_URL}/Workdays/date/${this.datesService.backendFormatDate(date)}`)
      .pipe(map((workday: any): Workday => Workday.fromJSON(workday)));
  }

  getWorkdaysByWeek(weekdate: Date): Observable<Workday[]> {
    return this.http
      .get(`${API_URL}/workdays/week/${this.datesService.backendFormatDate(weekdate)}`)
      .pipe(map((list: any[]): Workday[] => list.map(Workday.fromJSON)));
  }

  createEmptyWeek(weekdate: Date): Observable<Workday[]> {
    return this.http
      .post(`${API_URL}/workdays/week/${this.datesService.backendFormatDate(weekdate)}`, null)
      .pipe(map((list: any[]): Workday[] => list.map(Workday.fromJSON)));
  }
}
