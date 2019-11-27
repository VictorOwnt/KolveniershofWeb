import { Injectable } from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {API_URL} from '../../environments/environment';
import {catchError, map} from 'rxjs/operators';
import {Bus} from '../shared/models/bus.model';
import {BusUnit} from '../shared/models/busUnit.model';



@Injectable({
  providedIn: 'root'
})
export class BusDataService {

  public loadingError$ = new Subject<string>();
  constructor(protected http: HttpClient) { }

  get busses$(): Observable<Bus[]> {
    return this.http
      .get(`${API_URL}/busses/`)
      .pipe(catchError(error => {
        this.loadingError$.next(error.statusText);
        return of(null);
      }), map((list: any[]): Bus[] => list.map(Bus.fromJSON))
    );
  }

  postBus(bus: Bus): Observable<Bus> {
    return this.http
      .post<Bus>(`${API_URL}/busses/`, bus)
      .pipe(catchError(error => {
        this.loadingError$.next(error.statusText);
        return of(null);
      }), map(Bus.fromJSON));
  }

  patchBus(bus: Bus): Observable<Bus> {
    return this.http
      .patch(`${API_URL}/busses/id/${bus.id}`, bus)
      .pipe(map(Bus.fromJSON));
  }

  deleteBus(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${API_URL}/busses/id/${id}`);
  }

  get busUnits$(): Observable<BusUnit[]> {
    return this.http
      .get(`${API_URL}/busses/units`)
      .pipe(catchError(error => {
        this.loadingError$.next(error.statusText);
        return of(null);
      }), map((list: any[]): BusUnit[] => list.map(BusUnit.fromJSON)));
  }

  getBusUnitById(id: string): Observable<BusUnit> {
    return this.http
      .get(`${API_URL}/busses/units/id/${id}`)
      .pipe(map(BusUnit.fromJSON));
  }

  postBusUnit(busUnit: BusUnit): Observable<BusUnit> {
    return this.http
      .post(`${API_URL}/busses/units`, busUnit)
      .pipe(map(BusUnit.fromJSON));
  }

  patchBusUnit(busUnit: BusUnit): Observable<BusUnit> {
    return this.http
      .patch(`${API_URL}/busses/units/id/${busUnit.id}`, busUnit)
      .pipe(map(BusUnit.fromJSON));
  }

  deleteBusUnit(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${API_URL}/busses/units/id/${id}`);
  }
}
