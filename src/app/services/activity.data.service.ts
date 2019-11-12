import { Subject } from 'rxjs';


import { Injectable } from '@angular/core';

import { ActivityUnit } from '../domain/activityUnit.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
    providedIn: "root"
  })
export class ActivityDataService {
    public loadingError$ = new Subject<string>();
  
    constructor(private http: HttpClient) {}

    updateActivityUnit(activityUnit:ActivityUnit){
        return this.http.patch(`${environment.apiUrl}/API/units/${activityUnit.id}`, activityUnit.toJSON());
    }
}