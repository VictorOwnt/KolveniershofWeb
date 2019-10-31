import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { MatDatepickerInputEvent } from "@angular/material";
import { BusUnitDataService } from "../busUnit.data.service";
import { BusUnit } from "../domain/busUnit.model";

@Component({
  selector: "app-busschema",
  templateUrl: "./busschema.component.html",
  styleUrls: ["./busschema.component.css"]
})
export class BusschemaComponent implements OnInit {
  public loadingError$ = this._busUnitDataService.loadingError$;
  private _fetchBusses$: Observable<BusUnit[]> = this._busUnitDataService
    .busUnits$;
  //private _busUnit: BusUnit;

  constructor(private _busUnitDataService: BusUnitDataService) {
    //this._fetchBusses$.subscribe(value => (this._busUnit = value));
  }

  ngOnInit() {
    // this.workday$.subscribe(e => console.log(e));
  }

  get busUnit$(): Observable<BusUnit[]> {
    return this._fetchBusses$;
  }

  // get busUnit$(): BusUnit {
  //   return this._busUnit;
  // }

  // set workday(date: Date) {
  // this._busUnitDataService
  // .busUnits$
  // .subscribe(val => (this._busUnit = val));
  //}
}
