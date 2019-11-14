import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { ActivityUnit } from '../domain/activityUnit.model';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../environments/environment';

@Injectable({
    providedIn: "root"
  })
export class ActivityDataService {
    public loadingError$ = new Subject<string>();
  
    constructor(private http: HttpClient) {}

    updateActivityUnit(activityUnit:ActivityUnit){
        return this.http.patch(`${API_URL}/units/${activityUnit.id}`, activityUnit.toJSON());
    }
}
