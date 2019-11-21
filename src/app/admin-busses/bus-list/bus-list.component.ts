import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Activity} from "../../shared/models/activity.model";
import {ActivityDataService} from "../../services/activity.data.service";
import {Bus} from "../../shared/models/bus.model";
import {BusDataService} from "../../services/bus.data.service";

@Component({
  selector: 'app-bus-list',
  templateUrl: './bus-list.component.html',
  styleUrls: ['./bus-list.component.scss']
})
export class BusListComponent implements OnInit {

  private _fetchBusses$: Observable<Bus[]> = this._busDataService.busses$;
  private _busses: Bus[];
  constructor(
      private _busDataService: BusDataService
  ) {
    this._fetchBusses$.subscribe(busses => (this._busses = busses));
  }

  ngOnInit() {
  }

  get busses$(): Observable<Bus[]> {
    return this._fetchBusses$;
  }


}
