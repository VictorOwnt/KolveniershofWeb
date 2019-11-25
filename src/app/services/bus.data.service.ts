import { Injectable } from '@angular/core';
import {Observable, of, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {User} from "../shared/models/user.model";
import {API_URL} from "../../environments/environment";
import {catchError, map} from "rxjs/operators";
import {Bus} from "../shared/models/bus.model";


@Injectable({
  providedIn: 'root'
})
export class BusDataService {

  public loadingError$ = new Subject<string>();
  constructor(private http: HttpClient) { }

  get busses$(): Observable<Bus[]> {
    return this.http.get(`${API_URL}/busses/`).pipe(
        catchError(error => {
          this.loadingError$.next(error.statusText);
          return of(null);
        }),
        map((list: any[]): Bus[] => list.map(Bus.fromJSON))
    );
  }

  postBus(bus: Bus): Observable<Bus> {
      return this.http.post(`${API_URL}/busses/`, bus)
          .pipe(map(Bus.fromJSON));

  }

    patchBus(bus: Bus): Observable<Bus> {
        return this.http
            .patch(`${API_URL}/busses/id/${bus.id}`, bus)
            .pipe(map(Bus.fromJSON));
    }
}
