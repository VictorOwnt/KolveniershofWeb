import {Component, Input, OnInit} from '@angular/core';
import {Bus} from '../../../models/bus.model';
import {AdminBussesComponent} from '../admin-busses.component';
import {BusListComponent} from '../bus-list/bus-list.component';

@Component({
  selector: 'app-admin-bus',
  templateUrl: './bus.component.html',
  styleUrls: ['./bus.component.scss']
})
export class BusComponent implements OnInit {

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
