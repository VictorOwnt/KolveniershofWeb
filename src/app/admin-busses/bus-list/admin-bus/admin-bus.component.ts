import {Component, Input, OnInit} from '@angular/core';
import {Activity} from "../../../shared/models/activity.model";
import {AdminActivitiesComponent} from "../../../admin-activities/admin-activities.component";
import {Bus} from "../../../shared/models/bus.model";
import {AdminBussesComponent} from "../../admin-busses.component";

@Component({
  selector: 'app-admin-bus',
  templateUrl: './admin-bus.component.html',
  styleUrls: ['./admin-bus.component.scss']
})
export class AdminBusComponent implements OnInit {

  @Input() public bus: Bus;

  constructor(public _b : AdminBussesComponent) { }

  ngOnInit() {
  }

  edit(): void {
    this._b.openDialog(this.bus);
  }

}
