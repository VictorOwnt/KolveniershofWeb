import { Injectable } from "@angular/core";
import { Observable, Subject, of } from "rxjs";
import { map, share, catchError, delay, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { BusUnit } from "./domain/busUnit.model";

@Injectable({
  providedIn: "root"
})
export class BusUnitDataService {
  public loadingError$ = new Subject<string>();

  constructor(private http: HttpClient) {}

  get busUnits$(): Observable<BusUnit[]> {
    return this.http.get(`${environment.apiUrl}/API/Busses/units`).pipe(
      catchError(error => {
        this.loadingError$.next(error.statusText);
        return of(null);
      }),
      map((list: any[]): BusUnit[] => list.map(BusUnit.fromJSON))
    );
  }
}
