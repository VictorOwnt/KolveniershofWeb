import {Observable, of, Subject} from 'rxjs';
import { Injectable } from '@angular/core';
import { ActivityUnit } from '../shared/models/activityUnit.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { API_URL } from '../../environments/environment';
import {Activity} from '../shared/models/activity.model';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ActivityDataService {
  public loadingError$ = new Subject<string>();

  constructor(private http: HttpClient) {}

  get activities$(): Observable<Activity[]> {
    return this.http
      .get(`${API_URL}/activities`)
      .pipe(catchError(error => {
        this.loadingError$.next(error.statusText);
        return of(null);
      }), map((list: any[]): Activity[] => list.map(Activity.fromJSON)));
  }

  getActivityById(id: string): Observable<Activity> {
    return this.http
      .get(`${API_URL}/activities/id/${id}`)
      .pipe(map(Activity.fromJSON));
  }

  postActivity(activity: Activity): Observable<Activity> {
    return this.http
      .post(`${API_URL}/activities`, activity)
      .pipe(map(Activity.fromJSON));
  }

  patchActivity(activity: Activity): Observable<Activity> {
    return this.http
      .patch(`${API_URL}/activities/id/${activity.id}`, activity)
      .pipe(map(Activity.fromJSON));
  }

  deleteActivity(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${API_URL}/activities/id/${id}`);
  }

  get activityUnits$(): Observable<ActivityUnit[]> {
    return this.http
      .get(`${API_URL}/activities/units`)
      .pipe(catchError(error => {
        this.loadingError$.next(error.statusText);
        return of(null);
      }), map((list: any[]): ActivityUnit[] => list.map(ActivityUnit.fromJSON)));
  }

  getActivityUnitById(id: string): Observable<ActivityUnit> {
    return this.http
      .get(`${API_URL}/activities/units/id/${id}`)
      .pipe(map(ActivityUnit.fromJSON));
  }

  postActivityUnit(activityUnit: ActivityUnit): Observable<ActivityUnit> {
    return this.http
      .post(`${API_URL}/activities/units`, activityUnit)
      .pipe(map(ActivityUnit.fromJSON));
  }

  patchActivityUnit(activityUnit: ActivityUnit, workdayId: string = null, workdayTemplateId: string = null): Observable<ActivityUnit> {
    const jsonData = { workdayId, workdayTemplateId, ...activityUnit };
    return this.http
      .patch(`${API_URL}/activities/units/id/${activityUnit.id}`, jsonData)
      .pipe(map(ActivityUnit.fromJSON));
  }

  deleteActivityUnit(activityUnit: ActivityUnit, workdayId: string = null, workdayTemplateId: string = null): Observable<boolean> {
    const jsonData = { workdayId, workdayTemplateId };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: jsonData,
    };
    return this.http
      .delete<boolean>(`${API_URL}/activities/units/id/${activityUnit.id}`, options);
  }

}
