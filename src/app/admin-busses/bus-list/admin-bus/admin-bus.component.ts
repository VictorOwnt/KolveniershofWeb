import {Component, Input, OnInit} from '@angular/core';
import {Activity} from "../../../shared/models/activity.model";
import {AdminActivitiesComponent} from "../../../admin-activities/admin-activities.component";
import {Bus} from "../../../shared/models/bus.model";
import {AdminBussesComponent} from "../../admin-busses.component";
import {BusListComponent} from "../bus-list.component";

@Component({
  selector: 'app-admin-bus',
  templateUrl: './admin-bus.component.html',
  styleUrls: ['./admin-bus.component.scss']
})
export class AdminBusComponent implements OnInit {

  @Input() public bus: Bus;

  constructor(public _b : AdminBussesComponent, public _bl : BusListComponent) { }

  ngOnInit() {
  }

  edit(): void {
    this._b.openDialog(this.bus);
  }

  delete(): void {
    this._bl.delete(this.bus.id);
  }

}
