import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Bus} from '../../models/bus.model';
import {AdminBussesComponent} from '../admin-busses.component';

@Component({
  selector: 'app-bus-list',
  templateUrl: './bus-list.component.html',
  styleUrls: ['./bus-list.component.scss']
})
export class BusListComponent implements OnInit {

  @Input() public busses: Observable<Bus[]>;
  constructor(public b: AdminBussesComponent) {}

  ngOnInit() {
  }

  delete(id: string): void {
    this.b.delete(id);
  }
}

