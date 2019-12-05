import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LunchUnit} from '../shared/models/lunchUnit.model';
import {API_URL} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LunchDataService {

  constructor(protected http: HttpClient) { }

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

  // TODO - patch unit

  // TODO - delete unit

}
