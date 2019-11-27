import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Activity} from "../../shared/models/activity.model";
import {ActivityDataService} from "../../services/activity.data.service";
import {Bus} from "../../shared/models/bus.model";
import {BusDataService} from "../../services/bus.data.service";
import {AdminBussesComponent} from "../admin-busses.component";

@Component({
  selector: 'app-bus-list',
  templateUrl: './bus-list.component.html',
  styleUrls: ['./bus-list.component.scss']
})
export class BusListComponent implements OnInit {

  @Input() public busses: Observable<Bus[]>;
  constructor(public _b : AdminBussesComponent) {}

  ngOnInit() {
  }

  delete(id : string) : void {
    this._b.delete(id);
  }

}
