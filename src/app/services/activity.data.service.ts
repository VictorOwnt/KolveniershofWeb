import {Observable, of, Subject} from 'rxjs';
import { Injectable } from '@angular/core';
import { ActivityUnit } from '../shared/models/activityUnit.model';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../environments/environment';
import {Activity} from "../shared/models/activity.model";
import {catchError, map} from "rxjs/operators";
import {User} from "../shared/models/user.model";

@Injectable({
    providedIn: 'root'
  })
export class ActivityDataService {
    public loadingError$ = new Subject<string>();

    constructor(private http: HttpClient) {}

    updateActivityUnit(activityUnit: ActivityUnit) {
        return this.http.patch(`${API_URL}/units/${activityUnit.id}`, activityUnit.toJSON());
    }

    get activities$(): Observable<Activity[]> {
        return this.http.get(`${API_URL}/Activities`).pipe(
            catchError(error => {
                this.loadingError$.next(error.statusText);
                return of(null);
            }),
        map((list: any[]): Activity[] => list.map(Activity.fromJSON))
        );
    }
}
