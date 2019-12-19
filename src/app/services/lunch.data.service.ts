import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LunchUnit} from '../models/lunchUnit.model';
import {API_URL} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LunchDataService {

  constructor(protected http: HttpClient) {
  }

  get lunchUnits$(): Observable<LunchUnit[]> {
    return this.http
      .get(`${API_URL}/lunches/units`)
      .pipe(map((list: any[]): LunchUnit[] => list.map(LunchUnit.fromJSON)));
  }

  getLunchUnitById(id: string): Observable<LunchUnit> {
    return this.http
      .get(`${API_URL}/lunches/units/id/${id}`)
      .pipe(map(LunchUnit.fromJSON));
  }

  postLunchUnit(lunchUnit: LunchUnit): Observable<LunchUnit> {
    return this.http
      .post(`${API_URL}/lunches/units`, lunchUnit)
      .pipe(map(LunchUnit.fromJSON));
  }

  patchLunchUnit(lunchUnit: LunchUnit, workdayId: string = null, workdayTemplateId: string = null): Observable<LunchUnit> {
    const jsonData = {workdayId, workdayTemplateId, ...lunchUnit};
    return this.http
      .patch(`${API_URL}/lunches/units/id/${lunchUnit.id}`, jsonData)
      .pipe(map(LunchUnit.fromJSON));
  }

  deleteLunchUnit(lunchUnit: LunchUnit, workdayId: string = null, workdayTemplateId: string = null): Observable<boolean> {
    const jsonData = {workdayId, workdayTemplateId};
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: jsonData,
    };
    return this.http
      .delete<boolean>(`${API_URL}/lunches/units/id/${lunchUnit.id}`, options);
  }

}
