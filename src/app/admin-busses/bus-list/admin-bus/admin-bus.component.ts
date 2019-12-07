import {Component, Input, OnInit} from '@angular/core';
import {Bus} from '../../../models/bus.model';
import {AdminBussesComponent} from '../../admin-busses.component';
import {BusListComponent} from '../bus-list.component';

@Component({
  selector: 'app-admin-bus',
  templateUrl: './admin-bus.component.html',
  styleUrls: ['./admin-bus.component.scss']
})
export class AdminBusComponent implements OnInit {

  @Input() public bus: Bus;

  constructor(public b: AdminBussesComponent, public bl: BusListComponent) { }

  ngOnInit() {
  }

  edit(): void {
    this.b.openDialog(this.bus);
  }

  delete(): void {
    this.bl.delete(this.bus.id);
  }

}
